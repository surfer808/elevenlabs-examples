# ElevenLabs Twilio AI Caller

## Project Overview
This project implements a voice-based intake system using ElevenLabs Conversational AI, allowing patients to complete intake forms through natural voice conversation. After the conversation completes, a transcript is sent via email to the healthcare provider.

## Architecture

### Key Components

1. **ElevenLabs Conversational AI**: Handles voice interaction with patients
   - Processes natural language and extracts key patient information
   - Creates transcript of the entire conversation

2. **Next.js Application**: Serves as the web interface and backend
   - Handles routing and API endpoints
   - Processes webhooks from ElevenLabs
   - Manages email delivery

3. **Resend Email API**: Handles email delivery
   - Sends formatted HTML emails containing conversation transcripts
   - Uses verified domain for improved deliverability

## API Endpoints

### `/api/elevenlabs-webhook`
- **Purpose**: Receives webhook calls from ElevenLabs after conversation completion
- **Method**: POST
- **Payload**: JSON with conversation transcript and recipient information
- **Action**: Processes transcript and triggers email notification

### `/api/email`
- **Purpose**: Alternative endpoint for sending emails directly
- **Method**: POST
- **Payload**: JSON with transcript and recipient information
- **Action**: Sends email using Resend API

## Email Functionality

### Configuration
- **Provider**: Resend
- **Sender Email**: info@aisolutionshawaii.com
- **Default Recipient**: info@aisolutionshawaii.com
- **Email Template**: React-based HTML template with transcript formatting

### Implementation Details
The email system uses Resend's direct API integration rather than SMTP for improved reliability. The implementation:

1. Validates environment variables and API keys
2. Processes transcripts from the webhook
3. Renders the email template with the transcript data
4. Sends the email using Resend's React template feature
5. Logs success or failure with detailed error information

## Environment Variables

```
# ElevenLabs API Configuration
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID=

# Resend Email Configuration
RESEND_API_KEY=
RESEND_FROM_EMAIL=info@aisolutionshawaii.com
```

## Testing
Various test scripts are included to validate the email functionality:
- `direct-email-test.js`: Tests direct Resend API email sending
- `webhook-test.js`: Simulates an ElevenLabs webhook call for end-to-end testing

## Troubleshooting
Common issues and their resolutions:
- **Email Not Sending**: Verify Resend API key and domain verification
- **Webhook Not Processing**: Check console logs for request payload validation
- **Environment Variables Not Loading**: Ensure correct configuration in `.env.local` and `next.config.js` 