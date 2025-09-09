// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message, website } = body || {};

    // --- Basic validation ----------------------------------------------------
    if (website) {
      // Honeypot triggered -> silently pretend success
      return NextResponse.json({ ok: true, skipped: true });
    }
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || 'Prathamesh <onboarding@resend.dev>';
    const RESEND_TO = process.env.RESEND_TO;

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'RESEND_API_KEY is not set on server.' },
        { status: 500 }
      );
    }
    if (!RESEND_TO) {
      return NextResponse.json(
        { ok: false, error: 'RESEND_TO is not set on server.' },
        { status: 500 }
      );
    }

    // --- Send email via Resend REST API -------------------------------------
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,             // Use onboarding@resend.dev in dev
        to: [RESEND_TO],
        reply_to: email,               // so you can reply directly
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Pass through Resend's reason to help debugging
      const reason = json?.name || json?.error || json?.message || 'Unknown error';
      return NextResponse.json(
        { ok: false, error: `Resend: ${reason}`, details: json },
        { status: res.status || 500 }
      );
    }

    return NextResponse.json({ ok: true, id: json.id || null });
  } catch (err) {
    // Last-resort error
    return NextResponse.json(
      { ok: false, error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
