import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'innovation_db',
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(request) {
  try {
    const { full_name, email, mobile, password, isMobileVerified, isDigilockerVerified } =
      await request.json();

    const cleanFullName = full_name ? full_name.trim() : '';
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanMobile = mobile ? mobile.toString().trim() : '';
    const cleanPassword = password ? password.trim() : '';

    // 1. Mandatory Fields Check
    if (!cleanFullName || !cleanEmail || !cleanMobile || !cleanPassword) {
      return NextResponse.json(
        { error: 'அனைத்து விவரங்களையும் சரியாக உள்ளிடவும்.' },
        { status: 400 }
      );
    }

    if (!isMobileVerified) {
      return NextResponse.json(
        { error: 'முதலில் மொபைல் எண்ணை OTP மூலம் சரிபார்க்க வேண்டும்.' },
        { status: 400 }
      );
    }

    // 2. Duplicate Validation (full_name, email, phone_number)
    const [existingUsers] = await pool.execute(
      'SELECT full_name, email, phone_number FROM public_users WHERE full_name = ? OR email = ? OR phone_number = ?',
      [cleanFullName, cleanEmail, cleanMobile]
    );

    if (existingUsers.length > 0) {
      const match = existingUsers[0];
      if (match.full_name.toLowerCase() === cleanFullName.toLowerCase()) {
        return NextResponse.json(
          { error: 'இந்த பெயர் ஏற்கனவே பயன்படுத்தப்பட்டுள்ளது. வேறு பெயரை உள்ளிடவும்.' },
          { status: 409 }
        );
      }
      if (match.email.toLowerCase() === cleanEmail.toLowerCase()) {
        return NextResponse.json(
          { error: 'இந்த மின்னஞ்சல் முகவரி ஏற்கனவே பதிவாகியுள்ளது.' },
          { status: 409 }
        );
      }
      if (match.phone_number === cleanMobile) {
        return NextResponse.json(
          { error: 'இந்த மொபைல் எண் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது.' },
          { status: 409 }
        );
      }
    }

    // 3. Assign Role: @gmail.com leads to 'citizen'
    let userRole = 'user';
    if (cleanEmail.endsWith('@gmail.com')) {
      userRole = 'citizen';
    }

    // 4. Password Hash
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    // 5. Store in public_users table using 'full_name' & 'phone_number'
    const insertSql = `
      INSERT INTO public_users (
        full_name,
        email,
        phone_number,
        password,
        role,
        is_mobile_verified,
        is_digilocker_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(insertSql, [
      cleanFullName,
      cleanEmail,
      cleanMobile,
      hashedPassword,
      userRole,
      true,
      Boolean(isDigilockerVerified),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'பதிவு வெற்றிகரமாக முடிந்தது!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json(
      { error: `பதிவு தோல்வி: ${error.message}` },
      { status: 500 }
    );
  }
}