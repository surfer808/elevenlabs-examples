// webhook-test.js - Simulates an ElevenLabs webhook call to test email sending
const fetch = require('node-fetch');

// ElevenLabs webhook simulation data
const mockWebhookData = {
  transcript: `
Patient: My name is John Doe.
AI: Thank you, John. Could you provide your date of birth?
Patient: January 15, 1980.
AI: Great, and what's your contact phone number?
Patient: 808-555-1234.
AI: Thank you. Do you have any allergies to medications?
Patient: I'm allergic to penicillin.
AI: I've noted that down. What insurance provider do you have?
Patient: I have HMSA.
AI: Thank you for providing that information. Is there anything else you'd like me to know about your medical history?
Patient: I had knee surgery last year.
AI: I've added that to your record. Thank you for completing this intake form.
  `,
  to: 'info@aisolutionshawaii.com'
};

async function simulateWebhook(apiKey) {
  try {
    console.log('Simulating ElevenLabs webhook call...');
    
    // Get the target URL from command line or use default
    const targetUrl = process.argv[3] || 'http://localhost:3000/api/elevenlabs-webhook';
    console.log(`Target URL: ${targetUrl}`);
    
    // Set headers for authentication if API key is provided
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    // Make the webhook call
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockWebhookData),
    });
    
    // Get response
    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { rawText: responseText };
    }
    
    console.log(`Status: ${response.status}`);
    console.log('Response:', responseData);
    
    if (response.ok) {
      console.log('Webhook simulation successful!');
    } else {
      console.error('Webhook simulation failed!');
    }
  } catch (error) {
    console.error('Error during webhook simulation:', error);
  }
}

// Get API key from command line argument
const apiKey = process.argv[2];
if (!apiKey) {
  console.log('No API key provided. The webhook call will be made without authentication.');
  console.log('Usage: node webhook-test.js [YOUR_API_KEY] [TARGET_URL]');
}

simulateWebhook(apiKey); 