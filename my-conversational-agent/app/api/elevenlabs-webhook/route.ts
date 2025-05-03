import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../post-call-webhook-email';
import { Resend } from 'resend';

// Initialize Resend with API key (will read from process.env.RESEND_API_KEY)
const resend = new Resend();

export async function POST(req: Request) {
  try {
    console.log('ElevenLabs webhook received');
    
    // Validate API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');
    }
    
    // Parse the request body
    const body = await req.json();
    console.log('Webhook payload received:', JSON.stringify(body));
    
    const { transcript, to } = body;
    
    // Default recipient if not provided
    const recipient = to || 'info@aisolutionshawaii.com';
    console.log('Sending email to:', recipient);
    
    // Default from email
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@aisolutionshawaii.com';
    console.log('Sending from:', fromEmail);
    
    // Send email using Resend
    try {
      const data = await resend.emails.send({
        from: fromEmail,
        to: recipient,
        subject: 'Your Conversational AI Agent is Ready!',
        react: EmailTemplate({ transcript }),
      });
      
      console.log('Email sent successfully:', data);
      return NextResponse.json({ success: true, data });
    } catch (resendError) {
      console.error('Error sending email via Resend:', resendError);
      return NextResponse.json({ 
        error: 'Failed to send email', 
        details: resendError instanceof Error ? resendError.message : String(resendError)
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to process webhook:', error);
    return NextResponse.json({ 
      error: 'Failed to process webhook', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 