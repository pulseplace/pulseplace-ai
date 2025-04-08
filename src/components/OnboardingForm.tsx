
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormFieldWithValidation from "./ui/form-field-with-validation";

const industries = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Education",
  "Manufacturing",
  "Retail",
  "Government",
  "Non-profit",
  "Hospitality",
  "Media & Entertainment",
  "Other"
];

interface OnboardingFormProps {
  onFormSubmit: (data: OnboardingFormData) => void;
}

export interface OnboardingFormData {
  email: string;
  companyName: string;
  role: string;
  industry: string;
}

// Create schema for validation
const formSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  companyName: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  role: z.string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role must be less than 100 characters"),
  industry: z.string()
    .min(1, "Please select an industry")
});

const OnboardingForm = ({ onFormSubmit }: OnboardingFormProps) => {
  const { toast } = useToast();
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      email: "",
      companyName: "",
      role: "",
      industry: ""
    }
  });

  const handleSubmit = (data: OnboardingFormData) => {
    toast({
      title: "Form Submitted",
      description: "Starting your PulseScore survey..."
    });
    onFormSubmit(data);
  };

  const industryOptions = industries.map(industry => ({
    value: industry,
    label: industry
  }));

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Get Started with PulsePlace.ai</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormFieldWithValidation
              control={form.control}
              name="email"
              label="Your work email"
              placeholder="jane@company.com"
              type="email"
              description="We'll never spam you or share your email"
              required
            />
            
            <FormFieldWithValidation
              control={form.control}
              name="companyName"
              label="Organization name you want scored"
              placeholder="Acme Corporation"
              required
            />
            
            <FormFieldWithValidation
              control={form.control}
              name="role"
              label="Your role"
              placeholder="Chief People Officer"
              description="e.g., HR Head, People Ops, Founder"
              required
            />
            
            <FormFieldWithValidation
              control={form.control}
              name="industry"
              label="Industry"
              description="Helps with benchmarking"
              type="select"
              selectOptions={industryOptions}
              placeholder="Select your industry"
              required
            />
            
            <Button 
              type="submit" 
              className="w-full bg-pulse-gradient"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 
                "Processing..." : 
                <>Get Your PulseScore <ArrowRight className="ml-2 h-4 w-4" /></>
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
