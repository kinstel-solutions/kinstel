"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Globe,
  RefreshCw,
  ShoppingCart,
  Monitor,
  FileText,
  Zap,
  Loader2,
  Check,
} from "lucide-react";
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
import {
  promoHeroSchema,
  promoFullSchema,
  SERVICE_OPTIONS,
  type PromoHeroFormValues,
  type PromoFullFormValues,
} from "./promo-schema";
import { submitPromoInquiryAction } from "./actions";
import { event } from "@/lib/gtag";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ─── Service Icon Map ─── */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "New Website": <Globe className="h-4 w-4" />,
  "Redesign": <RefreshCw className="h-4 w-4" />,
  "E-commerce": <ShoppingCart className="h-4 w-4" />,
  "SaaS / Web App": <Monitor className="h-4 w-4" />,
  "Landing Page": <FileText className="h-4 w-4" />,
  "Other": <Zap className="h-4 w-4" />,
};

/* ─── Service Selector Grid ─── */
function ServiceGrid({
  selected,
  onChange,
  error,
}: {
  selected: string[];
  onChange: (services: string[]) => void;
  error?: string;
}) {
  const toggle = (service: string) => {
    if (selected.includes(service)) {
      onChange(selected.filter((s) => s !== service));
    } else {
      onChange([...selected, service]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium leading-none">
        What do you need?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SERVICE_OPTIONS.map((service) => {
          const isSelected = selected.includes(service);
          return (
            <button
              key={service}
              type="button"
              onClick={() => toggle(service)}
              className={cn(
                "relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer select-none",
                "hover:border-accent/50 hover:bg-accent/5",
                isSelected
                  ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10"
                  : "border-border/50 bg-card/30 text-muted-foreground"
              )}>
              <span
                className={cn(
                  "shrink-0 transition-colors duration-200",
                  isSelected ? "text-accent" : "text-muted-foreground/60"
                )}>
                {SERVICE_ICONS[service]}
              </span>
              <span className="min-w-0 leading-tight">{service}</span>
              {isSelected && (
                <Check className="absolute top-1 right-1 h-3 w-3 text-accent animate-in fade-in zoom-in duration-200" />
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

/* ─── Main Form Component ─── */
interface PromoInquiryFormProps {
  variant: "hero" | "full";
  className?: string;
}

export function PromoInquiryForm({
  variant,
  className,
}: PromoInquiryFormProps) {
  const { toast } = useToast();
  const isHero = variant === "hero";
  const schema = isHero ? promoHeroSchema : promoFullSchema;

  const form = useForm<PromoHeroFormValues | PromoFullFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      services: [],
      ...(isHero ? {} : { phone: "", message: "" }),
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: PromoHeroFormValues | PromoFullFormValues) {
    const result = await submitPromoInquiryAction(values);

    if (result.success) {
      // Fire PMax-specific event ONLY
      event({
        action: "pmax_lead",
        category: "form",
        label: isHero ? "promo_hero_form" : "promo_full_form",
      });
      toast({
        title: "Audit Request Received!",
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
    <Card
      className={cn(
        "w-full transition-all duration-300 border-border/50",
        className
      )}>
      <CardHeader>
        <CardTitle className="text-center">
          {isHero
            ? "Get Your Free Website Audit"
            : "Claim Your Special Offer"}
        </CardTitle>
        <CardDescription className="text-center mt-1">
          {isHero
            ? "Tell us what you need — we'll show you how to get there."
            : "Complete the form below to secure your 20% Mother's Day discount."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name / Business Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Your name or business name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      required
                      placeholder="you@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone — Full variant only */}
            {!isHero && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Service Icon Grid */}
            <FormField
              control={form.control}
              name="services"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <ServiceGrid
                      selected={field.value as string[]}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Message — Full variant only */}
            {!isHero && (
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about your project (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of your needs..."
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                isHero ? "Get A Free Audit" : "Claim Offer NOW!"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              No spam. No obligation. We&apos;ll respond within 24 hours.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
