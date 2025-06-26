import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

// Helper to generate a random 6-digit code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST() {
  // We no longer need to check the method, as it will always be email.
  const destination = process.env.CONTACT_EMAIL;

  if (!destination) {
    console.error(`Configuration error: CONTACT_EMAIL is not set in .env`);
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes

  try {
    // --- Store the code in the database ---
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const verificationCodes = db.collection('verificationCodes');

    // Clean up old codes for the same destination before inserting a new one
    await verificationCodes.deleteMany({ destination });
    await verificationCodes.insertOne({
      destination,
      code,
      expiresAt,
      createdAt: new Date(),
    });

    // --- Send the code via email ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: destination,
      subject: 'Your Norwood Empire Admin Registration Code',
      text: `Your one-time registration code is: ${code}. It will expire in 10 minutes.`,
      html: `<p>Your one-time registration code is: <strong>${code}</strong>.</p><p>It will expire in 10 minutes.</p>`,
    });

    return NextResponse.json({ message: `Verification code sent to the designated email.` }, { status: 200 });

  } catch (error: unknown) {
    console.error(`Failed to send code via email:`, error);
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'An internal error occurred while sending the code.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}