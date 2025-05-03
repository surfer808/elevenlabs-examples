// test-api.js - Script to test the main API route functionality
const fetch = require('node-fetch');

async function testApiRoute() {
  try {
    console.log('Testing main API route...');
    
    const response = await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // No body needed for this endpoint based on implementation
    });
    
    const data = await response.json();
    console.log('Response:', data);
    console.log('Status:', response.status);
    
    if (response.ok) {
      console.log('API test successful!');
    } else {
      console.error('API test failed!');
    }
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testApiRoute(); 