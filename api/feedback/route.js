import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; // Or: import { pool } from '@/smart/lib/db';
// POST: Store citizen feedback & suggestions into innovation_db
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, email, rating, comments, suggestion } = body;

    // Validate mandatory fields
    if (!name || !email || !comments) {
      return NextResponse.json(
        { success: false, error: 'Name, Email, and Comments are required.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please check MySQL.' },
        { status: 500 }
      );
    }

    const query = `
      INSERT INTO feedback (user_id, name, email, rating, comments, suggestion) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      userId ? Number(userId) : null,
      name.trim(),
      email.trim().toLowerCase(),
      rating || 'Good',
      comments.trim(),
      suggestion ? suggestion.trim() : null
    ];

    const [result] = await pool.query(query, values);

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback stored successfully in innovation_db.',
        feedbackId: result.insertId
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Feedback POST Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Error occurred while saving feedback.' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all feedback
export async function GET() {
  try {
    if (!pool) {
      return NextResponse.json({ success: true, feedback: [] }, { status: 200 });
    }

    const [rows] = await pool.query('SELECT * FROM feedback ORDER BY created_at DESC');
    return NextResponse.json({ success: true, feedback: rows || [] }, { status: 200 });
  } catch (err) {
    console.error('Feedback GET Error:', err);
    return NextResponse.json({ success: true, feedback: [] }, { status: 200 });
  }
}