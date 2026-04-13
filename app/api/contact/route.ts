import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend SDK
// It automatically picks up RESEND_API_KEY from your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, budget, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' }, 
        { status: 400 }
      );
    }

    // Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: 'TDX Inquiries <onboarding@resend.dev>', // You can change this to your registered domain later
      to: ['hello@tdx.ai'], // Deliver straight to the client
      subject: `New Project Inquiry from ${name}`,
      reply_to: email, // This allows the client to natively hit "Reply" to the sender in Gmail
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Needed:</strong> ${service || 'Not specified'}</p>
          <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
