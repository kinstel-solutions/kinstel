
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface UserConfirmationEmailProps {
  name: string;
}

export const UserConfirmationEmail = ({ name }: UserConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>We've received your inquiry</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank You for Your Inquiry</Heading>
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          We have successfully received your message. Our team will review it and
          get back to you as soon as possible.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Kinstel</Text>
      </Container>
    </Body>
  </Html>
);

export default UserConfirmationEmail;

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
  padding: "0 30px",
  color: "#525f7f",
  textAlign: "left" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center" as const,
};
