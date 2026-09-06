import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function POST(req) {
  let connection;
  try {
    const body = await req.json();
    const {
      companyName,
      cinNumber,
      gstin,
      officialEmail,
      contactPerson,
      designation,
      phoneNumber,
      sector,
      csrBudget,
      incorporationCertBase64,
      consentLetterBase64
    } = body;

    if (!companyName || !cinNumber || !gstin || !officialEmail || !contactPerson || !designation || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'All statutory enterprise details are mandatory.' },
        { status: 400 }
      );
    }

    if (!incorporationCertBase64 || !consentLetterBase64) {
      return NextResponse.json(
        { success: false, error: 'Both Incorporation Certificate (.pdf) and Consent Letter (.pdf) are required.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json({ success: false, error: 'Database service offline.' }, { status: 500 });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.query(
      `SELECT id FROM industry_partners WHERE cin_number = ? OR official_email = ? LIMIT 1`,
      [cinNumber.trim().toUpperCase(), officialEmail.trim().toLowerCase()]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'An enterprise with this CIN or Email is already registered.' },
        { status: 409 }
      );
    }

    const cleanPrefix = companyName.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase() || 'CORP';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedUserId = `IND_${cleanPrefix}_${randomCode}`;
    const autoPassword = `${cleanPrefix}@${Math.floor(1000 + Math.random() * 9000)}`;

    // FIXED QUERY: 16 columns matched to 16 exact values
    await connection.query(
      `INSERT INTO industry_partners 
        (company_name, cin_number, gstin, official_email, contact_person, authorized_designation, phone_number, sector, annual_csr_budget, incorporation_cert_path, manager_consent_letter_path, digital_signature_verified, email_verified, phone_verified, role, verification_status)
       VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, 'incorporation_cert_verified.pdf', 'manager_consent_signed.pdf', 'YES', 'YES', 'YES', 'industry', 'VERIFIED')`,
      [
        companyName.trim(),
        cinNumber.trim().toUpperCase(),
        gstin.trim().toUpperCase(),
        officialEmail.trim().toLowerCase(),
        contactPerson.trim(),
        designation.trim(),
        phoneNumber.trim(),
        sector,
        csrBudget
      ]
    );

    await connection.query(
      `INSERT INTO users (name, email_or_user_id, password, role)
       VALUES (?, ?, ?, 'industry')`,
      [companyName.trim(), generatedUserId, autoPassword]
    );

    await connection.query(
      `INSERT INTO users (name, email_or_user_id, password, role)
       VALUES (?, ?, ?, 'industry')
       ON DUPLICATE KEY UPDATE password = VALUES(password)`,
      [companyName.trim(), officialEmail.trim().toLowerCase(), autoPassword]
    );

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: 'Enterprise registered successfully!',
      credentials: {
        userId: generatedUserId,
        password: autoPassword,
        companyName: companyName.trim(),
        officialEmail: officialEmail.trim().toLowerCase(),
        contactPerson: contactPerson.trim(),
        designation: designation.trim()
      }
    }, { status: 201 });

  } catch (err) {
    if (connection) await connection.rollback();
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}