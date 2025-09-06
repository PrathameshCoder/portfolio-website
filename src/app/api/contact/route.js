// /src/app/api/contact/route.js
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Validate incoming data
const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
  // Honeypot field (should be empty)
  website: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// (Optional) tiny in-memory rate limit for dev
let lastHit = 0;

export async function POST(req) {
  try {
    // Basic rate limit (2s between submissions)
    const now = Date.now();
    if (now - lastHit < 2000) {
      return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }
    lastHit = now;

    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot caught a bot -> pretend success, do nothing
    if (website && website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Send the email
    await resend.emails.send({
      // Dev-friendly sender (works on localhost without DNS):
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["prathameshgongle.j@gmail.com"], // ← put your real inbox here
      subject: `New message from ${name}`,
      reply_to: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      // You can also send HTML if you prefer
      // html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
