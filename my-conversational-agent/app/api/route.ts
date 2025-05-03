import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/app/post-call-webhook-email';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Handler for GET requests
export async function GET() {
  return NextResponse.json({ status: "API ready" });
}

// Handler for POST requests - centralized email sending
export async function POST(req: NextRequest) {
  try {
    // Log the API key (masked) for debugging
    const apiKey = process.env.RESEND_API_KEY || '';
    const maskedKey = apiKey ? 
      apiKey.substring(0, 4) + '...' + apiKey.substring(apiKey.length - 4) : 
      'Not found';
    console.log('Using Resend API key (masked):', maskedKey);
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not found in environment variables');
    }
    
    // Verify from email
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    console.log('Using from email:', fromEmail);
    
    // Send email to user
    console.log('Sending email to info@aisolutionshawaii.com');
    
    // Extract transcript from request body (if available)
    let transcript = '';
    try {
      const body = await req.json();
      transcript = body.transcript || '';
    } catch (e) {
      console.log('No request body or unable to parse JSON');
    }
    
    // Send email using Resend
    const data = await resend.emails.send({
      from: fromEmail,
      to: 'info@aisolutionshawaii.com',
      subject: 'Your Conversational AI agent information',
      react: EmailTemplate({ transcript }), 
    });
    
    console.log('Email sent successfully, response:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return detailed error for debugging
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
