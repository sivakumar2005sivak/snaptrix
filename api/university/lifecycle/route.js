import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

// GET: குறிப்பிட்ட பல்கலைக்கழகத்திற்கு உரிய புகார்கள் மற்றும் அதன் 20 நாள் விவரங்களைப் பெறுதல்
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const universityCode = searchParams.get('universityCode');

    if (!universityCode) {
      return NextResponse.json({ success: false, error: 'University Code required' }, { status: 400 });
    }

    if (!pool) {
      return NextResponse.json({ success: false, error: 'Database offline' }, { status: 500 });
    }

    const [rows] = await pool.query(
      `SELECT 
          c.*,
          DATEDIFF(c.deadline_at, NOW()) AS remaining_days,
          t.team_name, t.lead_name, t.lead_roll, t.faculty_mentor, t.department,
          p.prototype_title, p.photo_url, p.video_demo_link,
          cs.citizen_satisfied_status, cs.consent_file_path,
          d.final_dossier_pdf, d.funding_status, d.funding_amount
       FROM university_complaints c
       LEFT JOIN complaint_teams t ON t.complaint_id = c.id
       LEFT JOIN complaint_prototypes p ON p.complaint_id = c.id
       LEFT JOIN complaint_consents cs ON cs.complaint_id = c.id
       LEFT JOIN complaint_dossiers d ON d.complaint_id = c.id
       WHERE c.assigned_university_code = ?
       ORDER BY c.id DESC`,
      [universityCode.trim().toUpperCase()]
    );

    return NextResponse.json({ success: true, complaints: rows });
  } catch (err) {
    console.error('Lifecycle GET Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: படிநிலைகளின்படி (Stages) தகவல்களைப் பதிவு செய்தல்
export async function POST(req) {
  let connection;
  try {
    const body = await req.json();
    const { action, complaintId, payload } = body;

    if (!action || !complaintId) {
      return NextResponse.json({ success: false, error: 'Action and Complaint ID required' }, { status: 400 });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Stage 1: Student R&D Team Allocation (Within 3 Days)
    if (action === 'ALLOCATE_TEAM') {
      const { teamName, leadName, leadRoll, facultyMentor, mentorDesignation, department, techStack } = payload;
      
      await connection.query(
        `INSERT INTO complaint_teams (complaint_id, team_name, lead_name, lead_roll, faculty_mentor, mentor_designation, department, tech_stack)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [complaintId, teamName, leadName, leadRoll, facultyMentor, mentorDesignation, department, techStack]
      );

      await connection.query(
        `UPDATE university_complaints SET stage = 'TEAM_ALLOCATED' WHERE id = ?`,
        [complaintId]
      );
    }

    // 2. Stage 2: Prototype Proof Upload (By Day 10)
    else if (action === 'UPLOAD_PROTOTYPE') {
      const { prototypeTitle, prototypeDesc, photoUrl, videoDemoLink, githubOrHardwareDocs } = payload;

      await connection.query(
        `INSERT INTO complaint_prototypes (complaint_id, prototype_title, prototype_desc, photo_url, video_demo_link, github_or_hardware_docs)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [complaintId, prototypeTitle, prototypeDesc, photoUrl || 'prototype.png', videoDemoLink, githubOrHardwareDocs]
      );

      await connection.query(
        `UPDATE university_complaints SET stage = 'PROTOTYPE_READY' WHERE id = ?`,
        [complaintId]
      );
    }

    // 3. Stage 3: Citizen Consent Upload (By Day 15)
    else if (action === 'UPLOAD_CONSENT') {
      const { citizenSatisfiedStatus, consentFilePath, citizenFeedback } = payload;

      await connection.query(
        `INSERT INTO complaint_consents (complaint_id, citizen_satisfied_status, consent_file_path, citizen_feedback)
         VALUES (?, ?, ?, ?)`,
        [complaintId, citizenSatisfiedStatus || 'SATISFIED', consentFilePath || 'consent_doc.pdf', citizenFeedback]
      );

      await connection.query(
        `UPDATE university_complaints SET stage = 'CITIZEN_CONSENTED' WHERE id = ?`,
        [complaintId]
      );
    }

    // 4. Stage 4: Full Documentation & Funding Trigger (Day 16)
    else if (action === 'SUBMIT_DOSSIER') {
      const { finalDossierPdf } = payload;

      await connection.query(
        `INSERT INTO complaint_dossiers (complaint_id, final_dossier_pdf, is_verified, funding_status)
         VALUES (?, ?, TRUE, 'DISPATCHED_TOMORROW')`,
        [complaintId, finalDossierPdf || 'full_project_dossier.pdf']
      );

      await connection.query(
        `UPDATE university_complaints SET stage = 'FUNDING_DISPATCHED' WHERE id = ?`,
        [complaintId]
      );
    }

    await connection.commit();
    return NextResponse.json({ success: true, message: 'Stage updated successfully!' });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error('Lifecycle POST Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}