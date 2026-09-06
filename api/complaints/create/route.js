import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db'; // உங்கள் db பாதையை சரிபார்த்துக் கொள்ளவும்

export async function POST(req) {
  let connection;
  try {
    const body = await req.json();

    const title = (body.title || '').trim();
    const category = (body.category || 'Other').trim();
    const description = (body.description || '').trim();
    const district = (body.district || 'Ranchi').trim();
    const locationAddress = (body.locationAddress || body.location_address || '').trim();
    const latitude = body.latitude ? String(body.latitude).trim() : null;
    const longitude = body.longitude ? String(body.longitude).trim() : null;
    const userId = body.userId ? parseInt(body.userId, 10) : null;
    const userEmail = (body.userEmail || body.email || '').trim().toLowerCase();

    // 1. Mandatory Fields Validation
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Title and Description are required.' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Service offline.' },
        { status: 500 }
      );
    }

    connection = await pool.getConnection();

    // 2. Insert into complaints table
    const [result] = await connection.query(
      `INSERT INTO complaints 
       (title, category, description, district, location_address, latitude, longitude, user_id, user_email, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted')`,
      [
        title,
        category,
        description,
        district,
        locationAddress || null,
        latitude,
        longitude,
        userId || null,
        userEmail || null
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Grievance registered successfully!',
        complaintId: result.insertId,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error('Complaint Registration DB Error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.sqlMessage || err.message || 'Database error occurred while saving complaint.',
      },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}