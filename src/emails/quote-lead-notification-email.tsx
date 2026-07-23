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
import { type QuoteLeadValues } from "@/app/quote-schema";

const needLabels: Record<string, string> = {
  website: "A new website",
  platform: "A web platform or app",
  marketing: "Marketing & growth",
  unsure: "Not sure — a mix",
};

export const QuoteLeadNotificationEmail = ({
  need,
  websiteSize,
  addOns,
  rush,
  platformType,
  marketingChoice,
  name,
  businessName,
  email,
  phone,
  source,
  rangeLow,
  rangeHigh,
  resultSummary,
}: QuoteLeadValues) => (
  <Html>
    <Head />
    <Preview>New Quote Builder lead: {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Quote Builder Lead</Heading>
        <Text style={paragraph}>
          Someone just completed the Quote Builder on kinstel.com/quote.
        </Text>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>Looking for:</Text>
          <Text style={value}>{needLabels[need] ?? need}</Text>

          {websiteSize && (
            <>
              <Text style={label}>Website size:</Text>
              <Text style={value}>{websiteSize}</Text>
            </>
          )}

          {addOns && addOns.length > 0 && (
            <>
              <Text style={label}>Add-ons selected:</Text>
              <Text style={value}>{addOns.join(", ")}</Text>
            </>
          )}

          {typeof rush === "boolean" && need === "website" && (
            <>
              <Text style={label}>Timeline:</Text>
              <Text style={value}>{rush ? "Rush (10-day)" : "Standard"}</Text>
            </>
          )}

          {platformType && (
            <>
              <Text style={label}>Platform type:</Text>
              <Text style={value}>{platformType}</Text>
            </>
          )}

          {marketingChoice && (
            <>
              <Text style={label}>Marketing interest:</Text>
              <Text style={value}>{marketingChoice}</Text>
            </>
          )}

          {(rangeLow || rangeHigh) && (
            <>
              <Text style={label}>Computed estimate range:</Text>
              <Text style={value}>
                ₹{rangeLow?.toLocaleString("en-IN")} – ₹
                {rangeHigh?.toLocaleString("en-IN")}
              </Text>
            </>
          )}

          {resultSummary && (
            <>
              <Text style={label}>Result shown to user:</Text>
              <Text style={value}>{resultSummary}</Text>
            </>
          )}
        </Section>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>Name:</Text>
          <Text style={value}>{name}</Text>

          {businessName && (
            <>
              <Text style={label}>Business name:</Text>
              <Text style={value}>{businessName}</Text>
            </>
          )}

          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>

          {phone && (
            <>
              <Text style={label}>WhatsApp / Phone:</Text>
              <Text style={value}>{phone}</Text>
            </>
          )}

          {source && (
            <>
              <Text style={label}>How they found us:</Text>
              <Text style={value}>{source}</Text>
            </>
          )}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent from the Quote Builder tool on kinstel.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default QuoteLeadNotificationEmail;

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
