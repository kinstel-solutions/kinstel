"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { inquirySchema, type InquiryFormValues } from "@/app/inquiry-schema";
import { submitInquiryAction } from "@/app/actions";
import { event } from "@/lib/gtag";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { LiquidCard } from "../ui/liquid-glass-card";
import { cn } from "@/lib/utils";

interface InquiryFormProps {
  minimal?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export function InquiryForm({
  minimal = false,
  className,
  title = "Book your Free Consultation",
  subtitle = "Let's find out how we can help elevate your Digital presence.",
  ctaText = "Unlock Offers",
}: InquiryFormProps) {
  const { toast } = useToast();
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      // businessName: "",
      email: "",
      phone: "",
      // subject: "",
      details: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: InquiryFormValues) {
    const result = await submitInquiryAction(values);

    if (result.success) {
      event({
        action: "generate_lead",
        category: "form",
        label: "inquiry_submission",
      });
      toast({
        title: "Inquiry Sent!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
  }

  return (
    <LiquidCard
      minimal={minimal}
      className={cn("w-full transition-all duration-300 ", className)}>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
        </CardTitle>
        <CardDescription className="text-center mt-2 text-sm text-muted-foreground">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name/Business Name </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter your name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project needs..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-bold text-base h-12"
              size="lg"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                ctaText
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </LiquidCard>
  );
}
