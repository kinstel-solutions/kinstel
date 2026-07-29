import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { CareerApplicationValues } from "@/app/careers/schema";

export const CareerApplicationEmail = ({
  fullName,
  email,
  phone,
  role,
  experience,
  location,
  portfolioUrl,
  resumeUrl,
  coverLetter,
}: CareerApplicationValues) => (
  <Html>
    <Head />
    <Preview>New Career Application: {fullName} ({role})</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Candidate Application</Heading>
        <Text style={paragraph}>
          A new job application has been submitted on the Kinstel Solutions careers portal.
        </Text>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>Applied Role:</Text>
          <Text style={roleBadge}>{role}</Text>

          <Text style={label}>Candidate Name:</Text>
          <Text style={value}>{fullName}</Text>

          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>

          <Text style={label}>Phone:</Text>
          <Text style={value}>{phone}</Text>

          {experience && (
            <>
              <Text style={label}>Experience Level:</Text>
              <Text style={value}>{experience}</Text>
            </>
          )}

          {location && (
            <>
              <Text style={label}>Candidate Location:</Text>
              <Text style={value}>{location}</Text>
            </>
          )}

          {portfolioUrl && (
            <>
              <Text style={label}>Portfolio / Website / GitHub:</Text>
              <Text style={value}>
                <Link href={portfolioUrl} style={linkStyle}>
                  {portfolioUrl}
                </Link>
              </Text>
            </>
          )}

          <Text style={label}>Resume / CV Link:</Text>
          <Text style={value}>
            <Link href={resumeUrl} style={linkStyle}>
              {resumeUrl}
            </Link>
          </Text>
        </Section>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>Cover Note / Intro:</Text>
          <Text style={messageText}>{coverLetter}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Sent automatically from the Careers Application portal on kinstel.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default CareerApplicationEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "24px 0 48px",
  marginBottom: "64px",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "0",
  textAlign: "center" as const,
  padding: "0 24px",
  color: "#0f172a",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "22px",
  textAlign: "center" as const,
  padding: "0 24px",
  color: "#475569",
};

const detailsSection = {
  padding: "0 24px",
};

const label = {
  fontSize: "13px",
  fontWeight: "bold",
  color: "#64748b",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "2px",
};

const roleBadge = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#2563eb",
  margin: "0 0 16px 0",
};

const value = {
  fontSize: "15px",
  color: "#1e293b",
  lineHeight: "22px",
  margin: "0 0 14px 0",
};

const linkStyle = {
  color: "#2563eb",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "20px 0",
};

const messageText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#1e293b",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  color: "#94a3b8",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
