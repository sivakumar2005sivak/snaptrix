import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (!pool) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    const [rows] = await pool.query(
      `SELECT 
          c.id AS college_id,
          c.college_name,
          c.college_code,
          c.university_name,
          c.college_address,
          c.college_city,
          c.college_state,
          c.has_ecell,
          c.department_count,
          sd.id AS spoc_id,
          sd.spoc_name,
          sd.spoc_education,
          sd.spoc_experience,
          sd.spoc_email,
          sd.spoc_phone,
          sd.created_at,
          doc.passport_photo_path,
          doc.consent_letter_path,
          uc.login_user_id
       FROM university_credentials uc
       JOIN spoc_details sd ON uc.spoc_id = sd.id
       JOIN colleges c ON uc.college_id = c.id
       LEFT JOIN spoc_documents doc ON doc.spoc_id = sd.id
       WHERE uc.login_user_id = ?`,
      [userId.trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'SPOC Profile not found' }, { status: 404 });
    }

    const [deptRows] = await pool.query(
      `SELECT department_name FROM college_departments WHERE college_id = ?`,
      [rows[0].college_id]
    );

    const departments = deptRows.map((d) => d.department_name).join(', ');

    return NextResponse.json({
      success: true,
      profile: {
        ...rows[0],
        departmentNames: departments || 'CSE, ECE, Mech, Civil'
      }
    });
  } catch (err) {
    console.error('Fetch Profile Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}