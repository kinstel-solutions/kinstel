"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Send, Info, User, Mail, Phone, FileText, Fingerprint, MessageSquare, ShieldCheck, Wallet, Lock, Shield } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  paymentSchema,
  type PaymentFormValues,
  SUPPORTED_CURRENCIES,
  CURRENCY_SYMBOLS,
  type Currency,
  convertCurrency,
} from "../payment-schema";
import {
  createOrderAction,
  verifyPaymentAction,
  sendPaymentReceiptAction,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ToWords } from "to-words";

const toWordsIN = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paise',
        plural: 'Paise',
        symbol: '',
      },
    }
  }
});

const toWordsUS = new ToWords({
  localeCode: "en-US",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Dollar',
      plural: 'Dollars',
      symbol: '$',
      fractionalUnit: {
        name: 'Cent',
        plural: 'Cents',
        symbol: '',
      },
    }
  }
});

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Payment Form Component
 * Handles client payment input and Razorpay checkout integration
 */
export default function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Parameter parsing
  const urlAmount = searchParams.get("amount");
  const urlPurpose = searchParams.get("purpose");
  const urlPid = searchParams.get("pid");
  const urlEmail = searchParams.get("email");
  const urlName = searchParams.get("name");
  const urlPhone = searchParams.get("phone");
  const urlDesc = searchParams.get("desc");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      currency: "INR",
      amount: urlAmount ? parseFloat(urlAmount) : undefined,
      name: urlName || "",
      email: urlEmail || "",
      phone: urlPhone || "",
      proposalRef: urlPurpose || "",
      projectId: urlPid || `KS-TOKEN-${Date.now()}`,
      description: urlDesc || "",
    },
  });

  // Track previous currency for conversion
  const previousCurrency = useRef<Currency>("INR");

  // Watch for currency changes and auto-convert amount
  const currencyValue = watch("currency") || "INR";
  const amountValue = watch("amount");

  useEffect(() => {
    // Only convert if there's an amount and currency actually changed
    if (amountValue && currencyValue !== previousCurrency.current) {
      const convertedAmount = convertCurrency(
        amountValue,
        previousCurrency.current,
        currencyValue as Currency,
      );
      setValue("amount", convertedAmount);
      previousCurrency.current = currencyValue as Currency;
    }
  }, [currencyValue, amountValue, setValue]);

  /**
   * Load Razorpay script dynamically
   */
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /**
   * Handle form submission and payment flow
   */
  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setIsProcessing(true);
      setError(null);

      // 1. Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Failed to load payment gateway. Please try again.");
      }

      // 2. Create Razorpay order
      const orderResult = await createOrderAction(data.amount, data.currency, {
        projectId: data.projectId,
        proposalRef: data.proposalRef,
        customerName: data.name,
        description: data.description,
      });
      if (!orderResult.success) {
        throw new Error(orderResult.message);
      }

      // 3. Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "Kinstel Solutions",
        description: "Quick Pay Invoice Payment",
        order_id: orderResult.orderId,
        prefill: {
          name: data.name || "",
          email: data.email || "",
          contact: data.phone || "",
        },
        notes: {
          proposal_reference: data.proposalRef || "",
          description: data.description || "",
        },
        theme: {
          color: "#3b82f6", // Blue accent color
        },
        handler: async function (response: any) {
          // 4. Payment successful - verify signature
          const verifyResult = await verifyPaymentAction({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (!verifyResult.success) {
            setError(verifyResult.message);
            setIsProcessing(false);
            return;
          }

          // 5. Send receipt email (if email provided)
          await sendPaymentReceiptAction({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: data.amount,
            currency: data.currency,
            name: data.name,
            email: data.email,
            phone: data.phone,
            proposalRef: data.proposalRef,
            projectId: data.projectId,
            description: data.description,
            timestamp: new Date().toISOString(),
          });

          // 6. Redirect to success page with payment details
          const params = new URLSearchParams({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            amount: data.amount.toString(),
          });

          router.push(`/pay/success?${params.toString()}`);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setError(
              "Payment cancelled. Please try again if you wish to complete the payment.",
            );
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const currencySymbol = CURRENCY_SYMBOLS[currencyValue as Currency];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Wallet className="h-5 w-5 text-accent" />
            Payment Details
          </h2>
          <p className="text-sm text-muted-foreground">Select your currency and enter the amount from your invoice.</p>
        </div>

        {/* Currency Selector - Required */}
        <div className="space-y-2">
          <Label htmlFor="currency">Select your preferred payment currency <span className="text-red-500">*</span></Label>
          <Select 
            defaultValue={watch("currency")} 
            onValueChange={(value) => setValue("currency", value as Currency)}
            disabled={isProcessing}
          >
            <SelectTrigger id="currency" className="h-12">
              <SelectValue placeholder="Choose Currency" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_CURRENCIES.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency} ({CURRENCY_SYMBOLS[currency]})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.currency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currency.message}
            </p>
          )}
        </div>

        {/* Amount Field - Required */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount in {currencyValue} <span className="text-red-500">*</span></Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-20">
              <span className="text-accent font-bold text-lg">
                {currencySymbol}
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder={`e.g. 5000`}
              {...register("amount", { valueAsNumber: true })}
              className="pl-10 h-12 text-lg font-medium"
              disabled={isProcessing}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
          
          {/* Amount in Words Verification Badge */}
          {amountValue > 0 && !isNaN(amountValue) && !errors.amount && (
            <div className="mt-3 p-4 rounded-lg bg-accent/5 border border-accent/20 animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Verification: Amount in words</p>
                  <p className="text-foreground font-semibold leading-tight">
                    {currencyValue === 'INR' 
                      ? toWordsIN.convert(amountValue, { currency: true }) 
                      : toWordsUS.convert(amountValue, { currency: true })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-border mt-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <User className="h-5 w-5 text-accent" />
              Your Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Please provide your details so we can issue the payment receipt to the correct name/business.
            </p>
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name / Business Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent z-20 pointer-events-none" />
              <Input
                id="name"
                type="text"
                placeholder="e.g. John Doe / Acme Corp"
                {...register("name")}
                className="pl-10 h-12"
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent z-20 pointer-events-none" />
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. +91 98899 88408"
                {...register("phone")}
                className="pl-10 h-12"
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent z-20 pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="e.g. your@email.com"
              {...register("email")}
              className="pl-10 h-12"
              disabled={isProcessing}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Section Heading: Project Context */}
        <div className="pt-8 border-t border-border mt-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Project Context
            </h2>
            <p className="text-sm text-muted-foreground">Help us link this payment to your project or invoice.</p>
          </div>
        </div>

        {/* Proposal Reference / Notes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="proposalRef">Invoice / Proposal Reference</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent z-20 pointer-events-none" />
              <Input
                id="proposalRef"
                type="text"
                placeholder="e.g. KS/23-24/001"
                {...register("proposalRef")}
                className="pl-10 h-12"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectId" className="flex items-center gap-1.5">
              Project / Tracking ID
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </Label>
            <div className="relative">
              <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent z-20 pointer-events-none" />
              <Input
                id="projectId"
                type="text"
                placeholder="e.g. PROJ-123456"
                {...register("projectId")}
                className="pl-10 h-12 bg-muted/10"
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Additional Notes / Remarks</Label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-accent z-20 pointer-events-none" />
            <Textarea
              id="description"
              placeholder="Optional details about specific items, delay reason, or invoice information..."
              {...register("description")}
              rows={4}
              className="pl-10 pt-3 resize-y"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Security / Trust Badges */}
        <div className="pt-8 border-t border-border/50 mt-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10">
              <div className="p-2 rounded-lg bg-background/50 text-accent">
                <Shield className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-wider text-accent font-bold">Encrypted</p>
                <p className="text-xs font-semibold text-foreground">256-bit SSL Secure</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10">
              <div className="p-2 rounded-lg bg-background/50 text-accent">
                <Lock className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-wider text-accent font-bold">Compliant</p>
                <p className="text-xs font-semibold text-foreground">PCI-DSS Gateway</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-accent/20 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full h-14 text-lg font-bold relative bg-accent text-white hover:bg-accent/90 transition-all">
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing Securely...
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5 mr-2" />
                Pay Securely Now
              </>
            )}
          </Button>
        </div>

        {/* Global Security Notice */}
        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          Kinstel Solutions never stores your credit card details.
        </p>
        
        {/* Card Networks - Ultra-Minimalist Trust Tray */}
        <div className="space-y-6 pt-10 border-t border-border/10 mt-10">
          <p className="text-[10px] text-center uppercase tracking-[0.3em] text-muted-foreground/30 font-bold">Trusted Payment Networks</p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {/* Visa */}
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 100 30" className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="25" fill="#1434CB" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="30">VISA</text>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 100 60" className="w-10 h-auto" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="30" r="25" fill="#EB001B" fillOpacity="0.9" />
                <circle cx="65" cy="30" r="25" fill="#F79E1B" fillOpacity="0.9" />
              </svg>
            </div>

            {/* RuPay */}
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 100 30" className="w-14 h-auto" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <text x="0" y="22" fill="#2D3291" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="22">RuPay</text>
              </svg>
            </div>

            {/* UPI */}
            <div className="flex items-center justify-center">
              <img 
                src="/extra-assets/UPI-Logo-vector.svg" 
                alt="UPI" 
                className="h-6 w-auto brightness-110 contrast-125" 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
