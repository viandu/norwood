import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handle POST requests
export async function POST(req: Request) {
  // Check for environment variables
  if (
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.COMPANY_RECIPIENT_EMAIL
  ) {
    console.error("Missing required environment variables for sending email.");
    return NextResponse.json(
      { success: false, error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Create a transporter object using Gmail SMTP
    // We use port 465 with SSL, which is the recommended secure option
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Use the App Password here
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_RECIPIENT_EMAIL, // The email address that receives the form submission
      replyTo: email, // Set the Reply-To to the user's email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #16a34a;">New Message from Norwood Empire Contact Form</h2>
          <p>You have received a new message from your website's contact form.</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; border-left: 3px solid #ccc; background-color: #f9f9f9;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return a success response
    // This matches what your frontend expects: { success: true }
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}