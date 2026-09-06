import { NextResponse } from 'next/server';

if (!global.__PHONE_OTP_STORE__) {
  global.__PHONE_OTP_STORE__ = new Map();
}

export async function POST(req) {
  try {
    const { action, phone, otp } = await req.json();

    const cleanPhone = phone ? String(phone).replace(/[^0-9]/g, '').slice(-10) : '';

    if (!cleanPhone || cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit mobile number required.' },
        { status: 400 }
      );
    }

    if (action === 'SEND' || action === 'RESEND') {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      global.__PHONE_OTP_STORE__.set(cleanPhone, {
        otp: String(generatedOtp),
        phone: cleanPhone,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
      });

      console.log(`[SMS OTP] Mobile: +91 ${cleanPhone} | Generated Code: ${generatedOtp}`);

      const smsApiKey = process.env.FAST2SMS_API_KEY;
      if (smsApiKey) {
        try {
          await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
              'authorization': smsApiKey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              variables_values: generatedOtp,
              route: 'otp',
              numbers: cleanPhone
            })
          });
        } catch (smsError) {
          console.error('SMS Gateway Error:', smsError.message);
        }
      }

      return NextResponse.json({
        success: true,
        message: `6-digit OTP has been sent via SMS to +91 ${cleanPhone}.`
      });
    }

    if (action === 'VERIFY') {
      const userEnteredOtp = String(otp || '').trim();

      if (!userEnteredOtp) {
        return NextResponse.json({ success: false, error: 'Please enter the 6-digit OTP.' }, { status: 400 });
      }

      const record = global.__PHONE_OTP_STORE__.get(cleanPhone);

      if (!record) {
        return NextResponse.json(
          { success: false, error: 'No active OTP found for this mobile number. Please click Resend.' },
          { status: 400 }
        );
      }

      if (Date.now() > record.expiresAt) {
        global.__PHONE_OTP_STORE__.delete(cleanPhone);
        return NextResponse.json(
          { success: false, error: 'OTP has expired. Please request a new one.' },
          { status: 400 }
        );
      }

      if (String(record.otp).trim() !== userEnteredOtp) {
        return NextResponse.json(
          { success: false, error: 'Incorrect OTP code. Please check and re-enter.' },
          { status: 401 }
        );
      }

      global.__PHONE_OTP_STORE__.delete(cleanPhone);

      return NextResponse.json({
        success: true,
        message: 'Mobile number verified successfully!'
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action.' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}