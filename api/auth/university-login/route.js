import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function POST(req) {
  try {
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        { success: false, error: 'SPOC User ID and Password are required.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed.' },
        { status: 500 }
      );
    }

    // Check credentials matching SPOC records
    const [rows] = await pool.query(
      `SELECT 
          uc.login_user_id, 
          uc.login_password, 
          sd.spoc_name, 
          sd.spoc_email, 
          sd.spoc_phone,
          c.college_name, 
          c.college_code,
          c.university_name,
          c.college_city
       FROM university_credentials uc
       JOIN spoc_details sd ON uc.spoc_id = sd.id
       JOIN colleges c ON uc.college_id = c.id
       WHERE uc.login_user_id = ? AND uc.login_password = ? AND uc.is_active = TRUE`,
      [userId.trim(), password.trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid SPOC User ID or Password. Please verify the credentials sent to your email.' },
        { status: 401 }
      );
    }

    const spoc = rows[0];

    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      user: {
        userId: spoc.login_user_id,
        name: spoc.spoc_name,
        email: spoc.spoc_email,
        phone: spoc.spoc_phone,
        college: spoc.college_name,
        collegeCode: spoc.college_code,
        university: spoc.university_name,
        city: spoc.college_city,
        role: 'university'
      }
    });

  } catch (err) {
    console.error('University Login API Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}