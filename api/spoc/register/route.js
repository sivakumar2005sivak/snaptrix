import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function POST(req) {
  let connection;
  try {
    const body = await req.json();
    const {
      spocName,
      spocEducation,
      hasEcell,
      spocExperience,
      spocEmail,
      spocPhone,
      spocPhotoName,
      consentLetterName,
      collegeName,
      collegeCode,
      universityName,
      collegeAddress,
      collegeCity,
      collegeState,
      departmentCount,
      departmentNames
    } = body;

    if (!spocName || !spocEmail || !spocPhone || !collegeName || !collegeCode) {
      return NextResponse.json({ success: false, error: 'Mandatory fields missing' }, { status: 400 });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Insert into colleges table
    const [collegeRes] = await connection.query(
      `INSERT INTO colleges (college_name, college_code, university_name, college_address, college_city, college_state, has_ecell, department_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        collegeName.trim(),
        collegeCode.trim().toUpperCase(),
        universityName.trim(),
        collegeAddress.trim(),
        collegeCity.trim(),
        collegeState.trim(),
        hasEcell || 'No',
        Number(departmentCount) || 1
      ]
    );
    const collegeId = collegeRes.insertId;

    // 2. Insert into spoc_details table
    const [spocRes] = await connection.query(
      `INSERT INTO spoc_details (college_id, spoc_name, spoc_education, spoc_experience, spoc_email, spoc_phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        collegeId,
        spocName.trim(),
        spocEducation.trim(),
        spocExperience.trim(),
        spocEmail.trim().toLowerCase(),
        spocPhone.trim()
      ]
    );
    const spocId = spocRes.insertId;

    // 3. Insert into spoc_documents table
    await connection.query(
      `INSERT INTO spoc_documents (spoc_id, college_id, passport_photo_path, consent_letter_path)
       VALUES (?, ?, ?, ?)`,
      [spocId, collegeId, spocPhotoName || 'passport_photo.png', consentLetterName || 'consent_letter.pdf']
    );

    // 4. Insert into college_departments table
    const deptList = (departmentNames || '').split(',').map((d) => d.trim()).filter(Boolean);
    for (const dept of deptList) {
      await connection.query(
        `INSERT INTO college_departments (college_id, department_name) VALUES (?, ?)`,
        [collegeId, dept]
      );
    }

    // 5. Generate User ID & Password
    const loginUserId = `SPOC_${collegeCode.trim().toUpperCase()}`;
    const generatedPassword = `Gov@${Math.floor(100000 + Math.random() * 900000)}`;

    // 6. Insert into university_credentials table
    await connection.query(
      `INSERT INTO university_credentials (college_id, spoc_id, login_user_id, login_password)
       VALUES (?, ?, ?, ?)`,
      [collegeId, spocId, loginUserId, generatedPassword]
    );

    // 7. Insert into common users table for unified login
    await connection.query(
      `INSERT INTO users (name, email_or_user_id, password, role)
       VALUES (?, ?, ?, 'university')
       ON DUPLICATE KEY UPDATE password = VALUES(password)`,
      [spocName.trim(), loginUserId, generatedPassword]
    );

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: 'SPOC and College registered successfully in all tables!',
      credentials: {
        userId: loginUserId,
        password: generatedPassword,
        email: spocEmail,
        college: collegeName
      }
    }, { status: 201 });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error('SPOC Register Transaction Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}