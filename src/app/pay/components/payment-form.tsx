"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Send, Info } from "lucide-react";
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

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      name: "",
      email: "",
      phone: "",
      proposalRef: urlPurpose || "",
      projectId: urlPid || `KS-TOKEN-${Date.now()}`,
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
        {/* Currency Selector - Required */}
        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-semibold mb-2 text-foreground">
            Currency <span className="text-red-500">*</span>
          </label>
          <select
            id="currency"
            {...register("currency")}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground"
            disabled={isProcessing}>
            {SUPPORTED_CURRENCIES.map((currency) => (
              <option
                key={currency}
                value={currency}>
                {currency} ({CURRENCY_SYMBOLS[currency]})
              </option>
            ))}
          </select>
          {errors.currency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currency.message}
            </p>
          )}
        </div>

        {/* Amount Field - Required */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-semibold mb-2 text-foreground">
            Amount to Pay <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 font-semibold">
                {currencySymbol}
              </span>
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder={`Enter amount (Min: 1 ${currencyValue})`}
              {...register("amount", { valueAsNumber: true })}
              className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
          {amountValue && !errors.amount && (
            <p className="text-sm text-muted-foreground mt-1">
              Amount: {currencySymbol}
              {amountValue.toLocaleString()}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Optional Details (helps us serve you better)
          </p>
        </div>

        {/* Optional Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-foreground">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              {...register("name")}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium mb-2 text-foreground">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98899 88408"
              {...register("phone")}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
            disabled={isProcessing}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            We&apos;ll send your receipt to this email
          </p>
        </div>

        {/* Proposal Reference / Notes */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="proposalRef"
              className="block text-sm font-medium mb-2 text-foreground">
              Invoice / Proposal Ref
            </label>
            <input
              id="proposalRef"
              type="text"
              placeholder="KS/23-24/001"
              {...register("proposalRef")}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>

          <div>
            <label
              htmlFor="projectId"
              className="block text-sm font-medium mb-2 text-foreground flex items-center gap-1.5">
              Project ID
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <input
              id="projectId"
              type="text"
              placeholder="KS-TOKEN-..."
              {...register("projectId")}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground bg-muted/30"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full">
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Pay Now
            </>
          )}
        </Button>

        {/* Security Notice */}
        <p className="text-xs text-center text-muted-foreground">
          Secured via secure payment gateway. Your payment information is encrypted and secure.
        </p>
        
        {/* Card Networks */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
          <div className="bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm flex items-center justify-center h-8 w-14">
            <svg viewBox="0 0 100 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="25" fill="#1434CB" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="30">VISA</text>
            </svg>
          </div>
          <div className="bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm flex items-center justify-center h-8 w-14">
            <svg viewBox="0 0 100 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="30" r="25" fill="#EB001B" fillOpacity="0.9" />
              <circle cx="65" cy="30" r="25" fill="#F79E1B" fillOpacity="0.9" />
            </svg>
          </div>
          <div className="bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm flex items-center justify-center h-8 w-14">
            <svg viewBox="0 0 100 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <text x="0" y="22" fill="#E86E24" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="22">RuPay</text>
            </svg>
          </div>
          <div className="bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm flex items-center justify-center h-8 w-14">
            <svg viewBox="0 0 100 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <text x="5" y="25" fill="#000" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="28">UPI</text>
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}
