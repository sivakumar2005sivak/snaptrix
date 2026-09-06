import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  port: process.env.DB_PORT || 3307,
  password: process.env.DB_PASSWORD || 'Sivakumar@2005',
  database: process.env.DB_NAME || 'innovation_db',
  waitForConnections: true,
  connectionLimit: 10,
});


export async function POST(request) {
  try {
    const { mobile, otp } = await request.json();

    // mobile மற்றும் otp சரிபார்த்தல்
    if (!mobile || !otp) {
      return NextResponse.json(
        { error: 'Mobile எண் மற்றும் OTP இரண்டும் அவசியம்.' },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.toString().trim();
    const cleanOtp = otp.toString().trim();

    // MySQL-ல் இருந்து சரிபார்த்தல்
    const [rows] = await pool.execute(
      'SELECT * FROM phone_otps WHERE mobile = ? AND otp = ?',
      [cleanMobile, cleanOtp]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'தவறான OTP. சரியாக உள்ளிடவும்.' },
        { status: 400 }
      );
    }

    const record = rows[0];
    if (new Date() > new Date(record.expires_at)) {
      return NextResponse.json(
        { error: 'OTP காலாவதியாகிவிட்டது. புதிய OTP அனுப்பவும்.' },
        { status: 400 }
      );
    }

    // வெரிஃபை ஆனவுடன் டேபிளிலிருந்து நீக்குதல்
    await pool.execute('DELETE FROM phone_otps WHERE mobile = ?', [cleanMobile]);

    return NextResponse.json({
      success: true,
      message: 'மொபைல் எண் வெற்றிகரமாக சரிபார்க்கப்பட்டது!',
    });
  } catch (error) {
    console.error('Verify OTP Server Error:', error);
    return NextResponse.json(
      { error: `சரிபார்ப்பதில் சிக்கல்: ${error.message}` },
      { status: 500 }
    );
  }
}