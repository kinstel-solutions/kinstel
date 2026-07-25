import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { type AuditLeadValues } from "@/app/audit-schema";

export const AuditLeadNotificationEmail = ({
  url,
  email,
  source,
}: AuditLeadValues) => (
  <Html>
    <Head />
    <Preview>New Website Audit lead: {url}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Website Audit Lead</Heading>
        <Text style={paragraph}>
          Someone just ran a free audit on kinstel.com/website-audit.
        </Text>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>Website Audited:</Text>
          <Text style={value}>{url}</Text>

          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>

          {source && (
            <>
              <Text style={label}>How they found us:</Text>
              <Text style={value}>{source}</Text>
            </>
          )}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent from the free Website Audit tool on kinstel.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AuditLeadNotificationEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "0",
  textAlign: "center" as const,
  padding: "0 20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  padding: "0 20px",
  color: "#525f7f",
};

const detailsSection = {
  padding: "0 20px",
};

const label = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#484848",
  marginBottom: "4px",
};

const value = {
  fontSize: "16px",
  color: "#525f7f",
  lineHeight: "24px",
  margin: "0 0 16px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
