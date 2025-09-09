// src/app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

// --- ENV ---
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM    = process.env.RESEND_FROM;     // e.g. onboarding@resend.dev
const RESEND_TO      = process.env.RESEND_TO;       // your inbox
const SENDER_NAME    = process.env.SENDER_NAME || "Portfolio Contact"; // optional

const resend = new Resend(RESEND_API_KEY);

// --- Helpers ---
const bad = (msg) =>
  NextResponse.json({ ok: false, error: msg }, { status: 400 });

export async function POST(req) {
  try {
    if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
      return bad("Server email configuration is missing.");
    }

    const body = await req.json().catch(() => ({}));
    const { name = "", email = "", message = "", website = "" } = body;

    // Honeypot
    if (website) return bad("Bot blocked.");

    // Validate
    if (!name || name.length > 100) return bad("Please provide a valid name.");
    const emailOk =
      typeof email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      email.length <= 254;
    if (!emailOk) return bad("Please provide a valid email.");
    if (!message || message.length < 5 || message.length > 5000)
      return bad("Please write a proper message.");

    // Compose email
    const fromHeader = `${SENDER_NAME} <${RESEND_FROM}>`; // display name + from email

    const subject = `New message from ${name}`;
    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromHeader,
      to: RESEND_TO,
      reply_to: email,          // so you can reply directly
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email send failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("API /contact error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected server error." }, { status: 500 });
  }
}

// Simple HTML escaper to avoid breaking markup
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
