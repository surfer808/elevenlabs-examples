/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server environment variables exposed to client-side
  env: {
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
    ELEVENLABS_AGENT_ID: process.env.ELEVENLABS_AGENT_ID,
    // Don't expose RESEND_API_KEY to the client for security reasons
    // Only the "from" email is made available to the client
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'info@aisolutionshawaii.com',
  },

  // Enable React Server Components
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 