import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { pool } from '../../../../lib/db'; // உங்கள் db பாதையை சரிபார்த்துக் கொள்ளவும்

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req) {
  let connection;
  try {
    const body = await req.json();
    const token = body.credential || body.token;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Google credential token is missing.' },
        { status: 400 }
      );
    }

    // 1. Google Token Verification
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve profile from Google.' },
        { status: 400 }
      );
    }

    const cleanEmail = payload.email.trim().toLowerCase();
    const fullName = payload.name || cleanEmail.split('@')[0];

    if (!pool) {
      return NextResponse.json(
        { success: false, error: 'Database service offline.' },
        { status: 500 }
      );
    }

    connection = await pool.getConnection();

    // 2. Check user in public_users using full_name
    const [rows] = await connection.query(
      `SELECT id, full_name, email, role 
       FROM public_users 
       WHERE LOWER(email) = ? LIMIT 1`,
      [cleanEmail]
    );

    let user;

    if (rows.length > 0) {
      // User exists
      user = rows[0];
    } else {
      // 3. New Google User -> Insert into public_users using full_name
      const defaultPassword = 'GOOGLE_AUTH_SSO_USER';

      const [insertResult] = await connection.query(
        `INSERT INTO public_users (full_name, email, phone_number, password, role)
         VALUES (?, ?, NULL, ?, 'student')`,
        [fullName, cleanEmail, defaultPassword]
      );

      user = {
        id: insertResult.insertId,
        full_name: fullName,
        email: cleanEmail,
        role: 'student',
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Google Authentication Successful!',
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role || 'student',
      },
    });
  } catch (err) {
    console.error('Google Auth Route Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Authentication error' },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}