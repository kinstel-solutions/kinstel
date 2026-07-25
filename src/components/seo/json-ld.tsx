type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

interface JsonLdProps {
  data: JsonLdData;
}

/**
 * Renders a JSON-LD <script> tag for structured data (schema.org).
 * Server component — safe to render multiple times per page (e.g. one per
 * schema type, or a single page hosting Organization + LocalBusiness + FAQPage).
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
