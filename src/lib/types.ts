import { type InquiryFormValues } from "@/app/inquiry-schema";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Inquiry = InquiryFormValues;