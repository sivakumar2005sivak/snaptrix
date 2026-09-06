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
    const { mobile } = await request.json();

    if (!mobile || mobile.toString().trim().length !== 10) {
      return NextResponse.json(
        { error: 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.' },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.toString().trim();
    const apiKey = process.env.TWOFACTOR_API_KEY;

    // 1. API Key Check
    if (!apiKey) {
      console.error('API KEY MISSING in .env.local');
      return NextResponse.json(
        { error: '.env.local கோப்பில் TWOFACTOR_API_KEY விடுபட்டுள்ளது!' },
        { status: 500 }
      );
    }

    // 2. Generate OTP
    const customOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 3. MySQL Insert with direct error log
    try {
      const sql = `
        INSERT INTO phone_otps (mobile, otp, expires_at)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE otp = VALUES(otp), expires_at = VALUES(expires_at)
      `;
      await pool.execute(sql, [cleanMobile, customOtp, expiresAt]);
    } catch (dbErr) {
      console.error('Database Error:', dbErr);
      return NextResponse.json(
        { error: `டேட்டாபேஸ் பிழை: phone_otps டேபிள் உள்ளதா எனப் பார்க்கவும் (${dbErr.message})` },
        { status: 500 }
      );
    }

    // 4. Send SMS via 2Factor
    const targetUrl = `https://2factor.in/API/V1/${apiKey}/SMS/${cleanMobile}/${customOtp}/OTP1`;
    const response = await fetch(targetUrl, { method: 'GET' });
    const data = await response.json();

    console.log('[2Factor Response]:', data);

    if (data.Status === 'Success') {
      return NextResponse.json({
        success: true,
        message: 'OTP SMS உங்கள் மொபைல் எண்ணிற்கு அனுப்பப்பட்டது!',
      });
    } else {
      return NextResponse.json(
        { error: `2Factor பிழை: ${data.Details}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Send OTP Server Catch Error:', error);
    return NextResponse.json(
      { error: `சர்வர் பிழை: ${error.message}` },
      { status: 500 }
    );
  }
}