
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import FormFieldWithValidation from "@/components/ui/form-field-with-validation";
import useFormValidation from "@/hooks/useFormValidation";
import { supabase } from '@/integrations/supabase/client';
import { emailService } from '@/services/emailService';

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
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

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

  const sendWelcomeEmail = async (values: FormValues) => {
    try {
      const firstName = values.name.split(' ')[0];
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai</h1>
          
          <p style="font-size: 18px;">Hello ${firstName},</p>
          
          <p>Thank you for joining the PulsePlace.ai private beta program!</p>
          
          <p>We're excited to have ${values.companyName} on board as we redefine workplace culture measurement and certification.</p>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
            <h3>Your Beta Application Details:</h3>
            <p><strong>Company:</strong> ${values.companyName}</p>
            <p><strong>Company Size:</strong> ${values.companySize}</p>
            <p><strong>Industry:</strong> ${values.industry}</p>
          </div>
          
          <h2>What happens next?</h2>
          <ol style="line-height: 1.6;">
            <li>Our team will review your application within 48 hours</li>
            <li>You'll receive an email with login credentials and onboarding instructions</li>
            <li>You'll get access to your PulsePlace dashboard</li>
            <li>We'll schedule a quick onboarding call to help you get started</li>
          </ol>
          
          <p>If you have any questions in the meantime, please reply to this email.</p>
          
          <p style="margin-top: 30px;">Looking forward to transforming your workplace culture,</p>
          <p><strong>The PulsePlace Team</strong></p>
          
          <div style="text-align: center; color: #64748b; margin-top: 30px; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
            <p>© 2025 PulsePlace, Inc. All rights reserved.</p>
          </div>
        </div>
      `;

      // Send confirmation email to the user
      const emailResult = await emailService.sendEmail({
        to: values.email,
        subject: `Welcome to the PulsePlace Beta Program, ${firstName}!`,
        html: emailHtml,
        fromName: "PulsePlace Beta",
        fromEmail: "beta@pulseplace.ai"
      });

      // Also send notification to admin
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>New Beta Registration</h2>
          <p><strong>Name:</strong> ${values.name}</p>
          <p><strong>Email:</strong> ${values.email}</p>
          <p><strong>Company:</strong> ${values.companyName}</p>
          <p><strong>Company Size:</strong> ${values.companySize}</p>
          <p><strong>Industry:</strong> ${values.industry}</p>
          ${values.message ? `<p><strong>Message:</strong> ${values.message}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `;

      await emailService.sendEmail({
        to: "admin@pulseplace.ai", // This would be changed to your actual admin email
        subject: `New Beta Registration: ${values.companyName}`,
        html: adminEmailHtml,
        fromName: "PulsePlace Beta System",
        fromEmail: "noreply@pulseplace.ai"
      });

      return emailResult.success;
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      return false;
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!validation.isValid) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }
    
    setLoading(true);
    
    try {
      // Store data in localStorage for demo purposes
      const existingLeads = JSON.parse(localStorage.getItem('betaLeads') || '[]');
      const newLead = {
        ...values,
        id: Date.now(),
        dateSubmitted: new Date().toISOString()
      };
      localStorage.setItem('betaLeads', JSON.stringify([...existingLeads, newLead]));
      
      // Send welcome email
      const emailSent = await sendWelcomeEmail(values);
      
      setUserName(values.name.split(' ')[0]); // Get first name
      setSubmitted(true);
      
      if (emailSent) {
        toast.success("Thank you for joining our beta program! We've sent you a confirmation email.");
      } else {
        toast.success("Thank you for joining our beta program! We'll be in touch soon.");
        console.warn("Email could not be sent, but form was processed");
      }
      
      form.reset();
    } catch (error) {
      console.error("Error processing form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-3xl mx-auto shadow-xl border-0">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-6 py-8">
            <CheckCircle className="h-20 w-20 text-green-500" />
            <h2 className="text-3xl font-bold">You're in, {userName}!</h2>
            <p className="text-xl text-gray-600 max-w-md">
              We'll send your private beta invite within 48 hours. Great workplaces don't guess — they pulse.
            </p>
            
            <div className="mt-8 space-y-6 w-full max-w-md">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">What happens next?</h3>
                <ol className="text-left space-y-3 pl-5">
                  <li className="list-decimal">You'll receive an email invitation within 48 hours</li>
                  <li className="list-decimal">Click the link to activate your account</li>
                  <li className="list-decimal">Get access to your PulsePlace dashboard</li>
                  <li className="list-decimal">Start your journey to certification</li>
                </ol>
              </div>
              
              <Button 
                className="w-full bg-pulse-gradient hover:opacity-90 transition-all"
                onClick={() => setSubmitted(false)}
              >
                Register another company
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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

