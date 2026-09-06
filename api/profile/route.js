import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET: Fetch user profile by id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'User ID required.' }, { status: 400 });

    const [rows] = await pool.query(
      'SELECT id, name, email, mobile, role, organization_name, district, address, created_at FROM users WHERE id = ? LIMIT 1',
      [Number(id)]
    );
    if (rows.length === 0) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

    return NextResponse.json({ success: true, user: rows[0] }, { status: 200 });
  } catch (err) {
    console.error('Profile GET Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Update user profile in MySQL users table
export async function PUT(req) {
  try {
    const { id, name, mobile, district, address } = await req.json();
    if (!id) return NextResponse.json({ error: 'User ID required.' }, { status: 400 });

    await pool.query(
      'UPDATE users SET name = ?, mobile = ?, district = ?, address = ? WHERE id = ?',
      [
        name?.trim() || '',
        mobile?.trim() || '',
        district?.trim() || '',
        address?.trim() || '',
        Number(id)
      ]
    );

    const [rows] = await pool.query(
      'SELECT id, name, email, mobile, role, organization_name, district, address FROM users WHERE id = ? LIMIT 1',
      [Number(id)]
    );

    return NextResponse.json({ success: true, message: 'Profile updated successfully.', user: rows[0] }, { status: 200 });
  } catch (err) {
    console.error('Profile PUT Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
