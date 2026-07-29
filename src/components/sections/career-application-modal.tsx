"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Send, Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  careerApplicationSchema,
  type CareerApplicationValues,
} from "@/app/careers/schema";
import { submitCareerApplicationAction } from "@/app/actions";

interface CareerApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole?: string;
}

export function CareerApplicationModal({
  isOpen,
  onOpenChange,
  selectedRole = "General Application",
}: CareerApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<CareerApplicationValues>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: selectedRole,
      experience: "",
      location: "",
      portfolioUrl: "",
      resumeUrl: "",
      coverLetter: "",
    },
  });

  // Keep form updated if selectedRole changes
  useEffect(() => {
    if (selectedRole) {
      form.setValue("role", selectedRole);
    }
  }, [selectedRole, form]);

  async function onSubmit(data: CareerApplicationValues) {
    setIsSubmitting(true);
    try {
      const res = await submitCareerApplicationAction(data);
      if (res.success) {
        setIsSubmitted(true);
        toast({
          title: "Application Received!",
          description: "Thank you for applying. We will review your application and reach out soon.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: res.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setIsSubmitted(false);
      form.reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-accent/20 bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" /> Direct Candidate Portal
          </div>
          <DialogTitle className="text-2xl font-bold font-headline text-foreground">
            {isSubmitted ? "Application Received!" : `Apply for ${selectedRole}`}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isSubmitted
              ? "Your application has been delivered to the Kinstel hiring team."
              : "Complete the form below to submit your application directly to our team."}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Thank you for applying, {form.getValues("fullName")}!
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              We have received your application for <span className="font-semibold text-foreground">{form.getValues("role")}</span>. Our hiring leads review candidates promptly.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Close Window
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Priya Sharma" {...field} />
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
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="priya@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone / WhatsApp *</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Applied Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selected Position *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Role title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Experience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience / Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2-4 years, Entry Level, Senior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Lucknow, Delhi NCR, Remote" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Resume / CV Link */}
              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume / CV Link *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Google Drive, Notion, Dropbox, or PDF link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Portfolio Link */}
              <FormField
                control={form.control}
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio / GitHub / LinkedIn (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/yourname or portfolio link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cover Letter */}
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Intro / Why Kinstel? *</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Tell us briefly about your background and why you'd be a great fit..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(false)}
                  disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
