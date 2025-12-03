
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
import { Inquiry } from "@/lib/types";

export const InquiryNotificationEmail = ({
  name,
  email,
  phone,
  subject,
  details,
  businessName,
}: Inquiry) => (
  <Html>
    <Head />
    <Preview>New Inquiry: {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Inquiry Received</Heading>
        <Text style={paragraph}>You have received a new inquiry through the Kinstel website contact form.</Text>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>From:</Text>
          <Text style={value}>{name}</Text>
          {businessName && (
            <>
              <Text style={label}>Business Name:</Text>
              <Text style={value}>{businessName}</Text>
            </>
          )}
          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>
          {phone && (
            <>
              <Text style={label}>Phone:</Text>
              <Text style={value}>{phone}</Text>
            </>
          )}
          <Text style={label}>Subject:</Text>
          <Text style={value}>{subject}</Text>
        </Section>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Message:</Text>
          <Text style={messageText}>{details}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent from the inquiry form on kinstel.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default InquiryNotificationEmail;

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

const messageText = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#525f7f",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
