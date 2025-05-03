// direct-email-test.js
// Run this with: node direct-email-test.js YOUR_RESEND_API_KEY
const { Resend } = require('resend');

async function sendTestEmail() {
  try {
    // Get API key from command line argument
    const apiKey = process.argv[2];
    
    if (!apiKey) {
      console.error('ERROR: No API key provided');
      console.log('Usage: node direct-email-test.js YOUR_RESEND_API_KEY');
      return;
    }
    
    console.log('Testing Resend API with provided key...');
    
    // Initialize Resend with provided API key
    const resend = new Resend(apiKey);
    
    // Send test email
    console.log('Sending test email to info@aisolutionshawaii.com...');
    const data = await resend.emails.send({
      from: 'info@aisolutionshawaii.com',
      to: 'info@aisolutionshawaii.com',
      subject: 'Aloha Intake - Test Email',
      html: `
        <h1>Test Email from Aloha Intake</h1>
        <p>This is a test email sent directly via the Resend API.</p>
        <p>Time sent: ${new Date().toISOString()}</p>
      `,
    });
    
    console.log('Email sent! Response:', data);
  } catch (error) {
    console.error('Error sending email via Resend:', error);
  }
}

sendTestEmail(); 