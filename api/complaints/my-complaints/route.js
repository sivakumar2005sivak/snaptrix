import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db'; // உங்கள் db பாதையைச் சரிபார்த்துக் கொள்ளவும்

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = (searchParams.get('email') || '').trim().toLowerCase();
    const userId = searchParams.get('userId');

    if (!email && !userId) {
      return NextResponse.json(
        { success: false, error: 'User Email or User ID is required to fetch complaints.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json(
        { success: false, error: 'Database service is offline.' },
        { status: 500 }
      );
    }

    // பயனர் சமர்ப்பித்த புகார்களைத் தேடுதல்
    const [rows] = await pool.query(
      `SELECT 
        id, 
        title, 
        category, 
        description, 
        district, 
        location_address, 
        latitude, 
        longitude, 
        status, 
        created_at 
       FROM complaints 
       WHERE LOWER(user_email) = ? OR user_id = ?
       ORDER BY created_at DESC`,
      [email, userId || null]
    );

    return NextResponse.json({
      success: true,
      complaints: rows,
      count: rows.length
    }, { status: 200 });

  } catch (err) {
    console.error('Fetch My Complaints Error:', err);
    return NextResponse.json(
      { success: false, error: err.sqlMessage || err.message || 'Internal database error.' },
      { status: 500 }
    );
  }
}