import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'University ID / Email and Password are required.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json({ success: false, error: 'Database service offline.' }, { status: 500 });
    }

    const cleanInput = identifier.trim().toLowerCase();

    // 1. Retrieve ONLY from users table
    const [rows] = await pool.query(
      `SELECT id, name, email_or_user_id, password, role 
       FROM users 
       WHERE LOWER(email_or_user_id) = ? 
       LIMIT 1`,
      [cleanInput]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid University credentials.' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 2. Validate Password
    if (user.password !== password.trim()) {
      return NextResponse.json(
        { success: false, error: 'Invalid University credentials.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'University Login successful!',
      user: {
        id: user.id,
        name: user.name,
        identifier: user.email_or_user_id,
        role: user.role
      }
    });

  } catch (err) {
    console.error('University Login Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}