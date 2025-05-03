import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

// Helper function to extract information from transcript
const extractInfoFromTranscript = (transcript: string) => {
  const info: {
    name: string;
    phone: string;
    email: string;
    dob: string;
    insurance: string;
    reason: string;
  } = {
    name: '',
    phone: '',
    email: '',
    dob: '',
    insurance: '',
    reason: ''
  };

  if (!transcript) return info;

  // Extract name
  const nameMatch = transcript.match(/(?:My name is|name is|I am|I'm) ([^.\n]+)/i);
  if (nameMatch && nameMatch[1]) info.name = nameMatch[1].trim();

  // Extract phone
  const phoneMatch = transcript.match(/(?:phone|number|contact).+?(\d[\d\s-]{8,})/i);
  if (phoneMatch && phoneMatch[1]) info.phone = phoneMatch[1].trim();

  // Extract email
  const emailMatch = transcript.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) info.email = emailMatch[0];

  // Extract date of birth
  const dobMatch = transcript.match(/(?:birth|born|dob).+?(\d{1,2}\/\d{1,2}\/\d{2,4}|\w+ \d{1,2},? \d{2,4}|\d{1,2} \w+ \d{2,4})/i);
  if (dobMatch && dobMatch[1]) info.dob = dobMatch[1].trim();

  // Extract insurance
  const insuranceMatch = transcript.match(/(?:insurance|provider|covered by).+?([A-Za-z]+(?:\s[A-Za-z]+)?)/i);
  if (insuranceMatch && insuranceMatch[1]) info.insurance = insuranceMatch[1].trim();

  // Extract reason
  const reasonMatch = transcript.match(/(?:reason|issue|problem|concerns|visit).+?([^.\n]+)/i);
  if (reasonMatch && reasonMatch[1]) info.reason = reasonMatch[1].trim();

  return info;
};

const EmailTemplate = ({ transcript }: { transcript?: string }) => {
  const patientInfo = transcript ? extractInfoFromTranscript(transcript) : {
    name: '',
    phone: '',
    email: '',
    dob: '',
    insurance: '',
    reason: ''
  };

  return (
    <Html>
      <Head />
      <Preview>New Patient Intake Information</Preview>
      <Tailwind>
        <Body className="bg-[#f4f4f5] font-sans py-[40px]">
          <Container className="mx-auto bg-white rounded-[8px] p-[20px] max-w-[600px]">
            {/* Header */}
            <Section className="mt-[32px]">
              <Heading className="text-[28px] font-bold text-[#333] m-0">
                New Patient Intake
              </Heading>
            </Section>

            {/* Patient Information */}
            <Section className="mt-[16px]">
              <Text className="text-[16px] m-0">
                <strong>Name:</strong> {patientInfo.name}
              </Text>
              <Text className="text-[16px] m-0">
                <strong>Phone:</strong> {patientInfo.phone}
              </Text>
              <Text className="text-[16px] m-0">
                <strong>Email:</strong> {patientInfo.email}
              </Text>
              <Text className="text-[16px] m-0">
                <strong>Date of Birth:</strong> {patientInfo.dob}
              </Text>
              <Text className="text-[16px] m-0">
                <strong>Insurance:</strong> {patientInfo.insurance}
              </Text>
              <Text className="text-[16px] m-0">
                <strong>Reason:</strong> {patientInfo.reason}
              </Text>
            </Section>

            {/* Transcript Section */}
            <Section className="mt-[24px]">
              <Text className="text-[16px] font-bold m-0">
                Transcript
              </Text>
              <Text className="text-[14px] whitespace-pre-line">
                {transcript}
              </Text>
            </Section>

            {/* 
            // Blue Box Section - Commented out as requested
            <Section className="bg-[#003366] rounded-[8px] p-[24px] mt-[24px]">
              <div className="mx-auto text-center mb-[16px]">
                <div 
                  className="inline-block rounded-full w-[64px] h-[64px] bg-gradient-to-b from-[#66B2FF] to-[#003366] flex items-center justify-center"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div 
                    className="text-white text-[32px] font-bold"
                    style={{
                      lineHeight: '1',
                    }}
                  >
                    ✓
                  </div>
                </div>
              </div>

              <Text className="text-white text-center text-[16px] mb-[16px]">
                Mahalo for signing up with Eye Doctor&apos;s Hawaii. I&apos;m Aunty Ai. I will help you complete your form by voice.
              </Text>
              <Text className="text-white text-center text-[16px] font-bold mb-[24px]">
                Click below to begin your application.
              </Text>

              <div className="text-center">
                <Button
                  href={`https://aisolutionshawaii.com/aloha-intake`}
                  className="bg-[#0099FF] text-white px-[24px] py-[12px] rounded-[4px] font-medium no-underline text-[16px] box-border"
                >
                  Start Your Application
                </Button>
              </div>
            </Section>
            */}

            {/* Footer */}
            <Section className="mt-[32px] text-center text-[#666666] text-[12px]">
              <Text className="m-0">
                © {new Date().getFullYear()} Eye Doctor&apos;s Hawaii. All rights reserved.
              </Text>
              <Text className="m-0">
                123 Eye Care Boulevard, Honolulu, HI 96815
              </Text>
              <Text className="m-0">
                <a href="https://eyedoctorshawaii.com/unsubscribe" className="text-[#666666]">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { EmailTemplate }; 