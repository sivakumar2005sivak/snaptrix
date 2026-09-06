import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// GET: Fetch all complaints or filter by user email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!pool) {
      return NextResponse.json({ success: true, complaints: [] }, { status: 200 });
    }

    let query = 'SELECT * FROM complaints ORDER BY created_at DESC';
    let params = [];

    if (email) {
      query = 'SELECT * FROM complaints WHERE email = ? ORDER BY created_at DESC';
      params = [email.trim().toLowerCase()];
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, complaints: rows || [] }, { status: 200 });
  } catch (err) {
    console.error('Complaints GET Error:', err);
    return NextResponse.json({ success: true, complaints: [] }, { status: 200 });
  }
}

// POST: Register a new complaint into innovation_db
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, department, category, location, details, userId } = body;

    if (!name || !email || !mobile || !department || !category || !location || !details) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please check MySQL.' },
        { status: 500 }
      );
    }

    const trackingId = 'JH-CP-' + Date.now().toString().slice(-6);

    const [result] = await pool.query(
      `INSERT INTO complaints 
      (tracking_id, user_id, name, email, mobile, department, category, location, details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted / In Triage')`,
      [
        trackingId,
        userId ? Number(userId) : null,
        name.trim(),
        email.trim().toLowerCase(),
        mobile.trim(),
        department,
        category,
        location.trim(),
        details.trim()
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Complaint submitted successfully.',
        trackingId,
        complaintId: result.insertId
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Complaints POST Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Error occurred while saving complaint.' },
      { status: 500 }
    );
  }
}