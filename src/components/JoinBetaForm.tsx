
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import FormFieldWithValidation from "@/components/ui/form-field-with-validation";
import useFormValidation from "@/hooks/useFormValidation";

// Enhanced validation schema with detailed error messages
const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." }),
  companyName: z.string()
    .min(2, { message: "Company name is required." })
    .max(100, { message: "Company name must be less than 100 characters." }),
  companySize: z.string()
    .min(1, { message: "Please select your company size." }),
  industry: z.string()
    .min(1, { message: "Please select your industry." }),
  message: z.string()
    .max(500, { message: "Message must be less than 500 characters." })
    .optional(),
  agreedToTerms: z.boolean()
    .refine(val => val === true, {
      message: "You must agree to the terms to proceed."
    })
});

type FormValues = z.infer<typeof formSchema>;

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501+", label: "501+ employees" }
];

const industries = [
  { value: "tech", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "other", label: "Other" }
];

const JoinBetaForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      companySize: "",
      industry: "",
      message: "",
      agreedToTerms: false
    }
  });
  
  // Use our custom validation hook
  const validation = useFormValidation(form);

  const onSubmit = (values: FormValues) => {
    if (!validation.isValid) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }
    
    setLoading(true);
    
    // Store data in localStorage for demo purposes
    const existingLeads = JSON.parse(localStorage.getItem('betaLeads') || '[]');
    const newLead = {
      ...values,
      id: Date.now(),
      dateSubmitted: new Date().toISOString()
    };
    localStorage.setItem('betaLeads', JSON.stringify([...existingLeads, newLead]));
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you for joining our beta program! We'll be in touch soon. If you have any questions, please email us at hello@pulseplace.ai");
      form.reset();
    }, 1500);
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-xl border-0">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormFieldWithValidation
                control={form.control}
                name="name"
                label="Your Name"
                placeholder="Jane Smith"
                required
              />
              
              <FormFieldWithValidation
                control={form.control}
                name="companyName"
                label="Company Name"
                placeholder="Acme Inc."
                required
              />
              
              <FormFieldWithValidation
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="jane@example.com"
                type="email"
                required
                description="We'll use this to contact you about the beta"
              />
              
              <FormFieldWithValidation
                control={form.control}
                name="companySize"
                label="Company Size"
                type="select"
                selectOptions={companySizes}
                placeholder="Select company size"
                required
              />
              
              <FormFieldWithValidation
                control={form.control}
                name="industry"
                label="Industry"
                type="select"
                selectOptions={industries}
                placeholder="Select industry"
                required
              />
              
              <div className="md:col-span-2">
                <FormFieldWithValidation
                  control={form.control}
                  name="message"
                  label="Tell Us More (Optional)"
                  type="textarea"
                  placeholder="What are your organization's biggest challenges with workplace culture?"
                />
              </div>
            </div>
            
            <FormFieldWithValidation
              control={form.control}
              name="agreedToTerms"
              label="I agree to receive updates about PulsePlace.ai and understand my data will be processed in accordance with the Privacy Policy."
              type="checkbox"
              required
            />
            
            <Button 
              type="submit" 
              className="w-full bg-pulse-gradient hover:opacity-90 transition-all h-12 text-base"
              disabled={loading || !validation.isValid}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Join the Beta Program'
              )}
            </Button>
            
            {validation.errorCount > 0 && (
              <div className="text-sm text-destructive">
                Please fix the {validation.errorCount} error{validation.errorCount > 1 ? 's' : ''} in the form.
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JoinBetaForm;
