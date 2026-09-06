import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function POST(req) {
  try {
    if (!pool) {
      return NextResponse.json({ success: false, error: 'Database service offline.' }, { status: 500 });
    }

    const body = await req.json();
    const identifier = (body.identifier || body.email || body.userId || '').trim();
    const password = (body.password || '').trim();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Corporate ID / Email and Password are required.' },
        { status: 400 }
      );
    }

    // 1. Authenticate against the users table (checks both IND_... ID or email)
    const [userRows] = await pool.query(
      `SELECT id, name, email_or_user_id, password, role 
       FROM users 
       WHERE (LOWER(email_or_user_id) = LOWER(?) OR email_or_user_id = ?) 
         AND role = 'industry' 
       LIMIT 1`,
      [identifier, identifier]
    );

    if (userRows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'This Corporate ID or Email is not registered. Please register first.' },
        { status: 404 }
      );
    }

    const matchedUser = userRows[0];

    // 2. Validate Password
    if (matchedUser.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Incorrect Corporate Password. Please try again.' },
        { status: 401 }
      );
    }

    // 3. Optional: Retrieve company profile from industry_partners
    const [partnerRows] = await pool.query(
      `SELECT id, company_name, official_email, contact_person, phone_number, sector 
       FROM industry_partners 
       WHERE LOWER(official_email) = LOWER(?) OR LOWER(company_name) = LOWER(?) 
       LIMIT 1`,
      [matchedUser.email_or_user_id, matchedUser.name]
    );

    const partner = partnerRows[0] || null;

    return NextResponse.json({
      success: true,
      message: 'Industry Login successful!',
      user: {
        id: matchedUser.id,
        name: partner ? partner.company_name : matchedUser.name,
        email: partner ? partner.official_email : matchedUser.email_or_user_id,
        contactPerson: partner ? partner.contact_person : '',
        role: 'industry'
      }
    });

  } catch (err) {
    console.error('Industry Login Route Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}