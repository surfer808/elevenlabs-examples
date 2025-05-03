// test-webhook.js - Script to test the webhook functionality
const fetch = require('node-fetch');

async function testWebhook() {
  try {
    console.log('Testing ElevenLabs webhook...');
    
    const response = await fetch('http://localhost:3000/api/elevenlabs-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transcript: 'This is a test transcript from webhook testing script.',
        to: 'info@aisolutionshawaii.com'
      }),
    });
    
    const data = await response.json();
    console.log('Response:', data);
    console.log('Status:', response.status);
    
    if (response.ok) {
      console.log('Webhook test successful!');
    } else {
      console.error('Webhook test failed!');
    }
  } catch (error) {
    console.error('Error testing webhook:', error);
  }
}

testWebhook(); 