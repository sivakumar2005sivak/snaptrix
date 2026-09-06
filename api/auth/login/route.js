import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

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
    const { identifier, password } = await request.json();

    // identifier = email அல்லது phone_number
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'மின்னஞ்சல்/மொபைல் எண் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim();

    // 1. பயனரைத் தேடுதல் (SELECT மட்டுமே செய்ய வேண்டும், INSERT செய்யக் கூடாது)
    const [rows] = await pool.execute(
      'SELECT * FROM public_users WHERE email = ? OR phone_number = ?',
      [cleanIdentifier, cleanIdentifier]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'பயனர் கணக்கு காணப்படவில்லை. தயவுசெய்து பதிவு செய்யவும்.' },
        { status: 404 }
      );
    }

    const user = rows[0];

    // 2. கடவுச்சொல்லைச் சரிபார்த்தல்
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'தவறான கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.' },
        { status: 401 }
      );
    }

    // 3. வெற்றிகரமான உள்நுழைவுத் தகவல்கள்
    return NextResponse.json({
      success: true,
      message: 'உள்நுழைவு வெற்றிகரமாக முடிந்தது!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: `உள்நுழைவில் பிழை: ${error.message}` },
      { status: 500 }
    );
  }
}