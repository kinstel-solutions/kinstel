"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ShieldCheck, Mail, Phone, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CheckoutFormData) => void;
  packageName: string;
  tokenAmount: number;
}

export interface CheckoutFormData {
  email: string;
  name: string;
  phone: string;
  description: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  packageName,
  tokenAmount,
}: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required to proceed.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onConfirm({ email, name, phone, description });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none bg-background/80 backdrop-blur-xl shadow-2xl">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Secure Checkout
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-muted-foreground mr-4">
                  Confirm your details to proceed with the booking token.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Package Summary Card */}
          <div className="mb-8 p-4 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Selected Package</p>
                <h3 className="text-lg font-bold text-foreground">{packageName}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Booking Token</p>
                <p className="text-xl font-black text-accent">₹{tokenAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="bg-background/50 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-accent" />
                  Name / Business Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name or Firm"
                  className="bg-background/50 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone" className="text-sm font-bold flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 00000 00000"
                  className="bg-background/50 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description" className="text-sm font-bold flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-accent" />
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Any specific requirements or project details you'd like to share..."
                  className="bg-background/50 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 min-h-[100px] resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-3">
              <div className="w-full mb-2 sm:mb-0">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Fully Refundable Booking Deposit
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={onClose}
                  className="flex-1 font-bold hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-[2] bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-tight transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  Proceed to Payment
                </Button>
              </div>
            </DialogFooter>
          </form>

          <p className="mt-6 text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold opacity-50">
            Secure bank-grade encryption • No hidden fees
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
