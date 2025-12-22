"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormSeparator,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSuccess,
} from "@/components/ui/popover-form";
import { inquirySchema, type InquiryFormValues } from "@/app/inquiry-schema";
import { submitInquiryAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function InquiryPopover() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      subject: "",
      details: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  async function onSubmit(data: InquiryFormValues) {
    const result = await submitInquiryAction(data);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        reset();
      }, 3000);
    } else {
      console.error(result.message);
    }
  }

  return (
    <PopoverForm
      title="Get Free Quotes"
      open={open}
      setOpen={setOpen}
      width="380px"
      height="500px"
      showCloseButton={!success}
      showSuccess={success}
      trigger={
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4 text-neutral-900" />
          Get Free Quotes
        </div>
      }
      triggerClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2 w-full"
      className="w-full"
      openChild={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col bg-white dark:bg-neutral-950">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your Name"
                className="h-8 text-sm"
              />
              {errors.name && (
                <p className="text-[10px] text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="Email"
                  className="h-8 text-sm"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="phone"
                  className="text-xs">
                  Phone
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Phone"
                  className="h-8 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="businessName"
                className="text-xs">
                Business (Optional)
              </Label>
              <Input
                id="businessName"
                {...register("businessName")}
                placeholder="Business Name"
                className="h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="subject"
                className="text-xs">
                Subject
              </Label>
              <Input
                id="subject"
                {...register("subject")}
                placeholder="Subject"
                className="h-8 text-sm"
              />
              {errors.subject && (
                <p className="text-[10px] text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="details"
                className="text-xs">
                Details
              </Label>
              <Textarea
                id="details"
                {...register("details")}
                placeholder="Project details..."
                className="resize-none text-sm min-h-[80px]"
              />
            </div>
          </div>

          <div className="relative flex h-12 items-center px-[10px] flex-shrink-0 border-t mt-auto">
            <PopoverFormSeparator />
            <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
              <PopoverFormCutOutLeftIcon />
            </div>
            <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
              <PopoverFormCutOutRightIcon />
            </div>
            <PopoverFormButton
              loading={isSubmitting}
              text="Send Inquiry"
            />
          </div>
        </form>
      }
      successChild={
        <PopoverFormSuccess
          title="Inquiry Sent"
          description="We'll get back to you with a quote soon!"
        />
      }
    />
  );
}
