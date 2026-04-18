"use server";

export interface ExtractedInvoiceData {
  success: boolean;
  invoiceNo?: string;
  amount?: number;
  projectId?: string;
  error?: string;
  missingFields?: string[];
}

/**
 * Server Action: Parse PDF Invoice (DISABLED)
 */
export async function parseInvoiceAction(
  formData: FormData,
): Promise<ExtractedInvoiceData> {
  return { 
    success: false, 
    error: "Auto-parsing is currently disabled. Please enter details manually." 
  };
}
