// test-resend-direct.js - Direct test of Resend API
require('dotenv').config(); // Load environment variables
const { Resend } = require('resend');

async function testResendDirectly() {
  try {
    console.log('Testing Resend API directly...');
    
    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error('ERROR: RESEND_API_KEY not found in environment variables');
      // Try to find .env file
      const fs = require('fs');
      try {
        const filesInDir = fs.readdirSync('.');
        console.log('Files in directory:', filesInDir);
        
        // Check for .env files
        const envFiles = filesInDir.filter(file => file.includes('.env'));
        console.log('.env files found:', envFiles);
        
        // Check my-conversational-agent dir
        if (fs.existsSync('my-conversational-agent')) {
          const filesInMCA = fs.readdirSync('my-conversational-agent');
          console.log('Files in my-conversational-agent:', filesInMCA);
          
          // Check for .env files
          const mcaEnvFiles = filesInMCA.filter(file => file.includes('.env'));
          console.log('.env files found in my-conversational-agent:', mcaEnvFiles);
        }
      } catch (fsError) {
        console.error('Error checking files:', fsError);
      }
      
      // Prompt for API key
      console.log('Please provide RESEND_API_KEY as a command line argument:');
      console.log('Usage: node test-resend-direct.js your_resend_api_key');
      
      // Check for command line provided key
      const apiKey = process.argv[2];
      if (apiKey) {
        console.log('Using API key from command line arguments');
        process.env.RESEND_API_KEY = apiKey;
      } else {
        return;
      }
    }
    
    // Initialize Resend with API key from environment
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Log key for debugging (masking most of it)
    const apiKey = process.env.RESEND_API_KEY || '';
    const maskedKey = apiKey ? 
      apiKey.substring(0, 4) + '...' + apiKey.substring(apiKey.length - 4) : 
      'Not found';
    console.log('Using Resend API key (masked):', maskedKey);
    
    // Check from email
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    console.log('Using from email:', fromEmail);
    
    // Send a test email
    console.log('Sending test email to info@aisolutionshawaii.com...');
    const data = await resend.emails.send({
      from: fromEmail,
      to: 'info@aisolutionshawaii.com',
      subject: 'Test Email from Direct Resend API Test',
      html: '<h1>Test Email</h1><p>This is a test email sent directly via the Resend API.</p>',
    });
    
    console.log('Email sent! Response:', data);
  } catch (error) {
    console.error('Error sending email directly via Resend:', error);
  }
}

testResendDirectly(); 