
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MailchimpSignupProps {
  title?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
  listId?: string;
  showPrivacyMessage?: boolean;
  privacyMessage?: string;
  showGdprCompliance?: boolean;
  gdprCompliance?: string;
  showTooltip?: boolean;
  tooltipContent?: string;
}

const MailchimpSignup = ({
  title = "Join the Beta",
  buttonText = "Get Certified",
  placeholder = "Your work email",
  className = "",
  showPrivacyMessage = true,
  privacyMessage = "We respect your privacy. You can unsubscribe at any time with one click.",
  showGdprCompliance = true,
  gdprCompliance = "By submitting this form, you agree to receive marketing emails. We'll handle your information in accordance with our Privacy Policy.",
  showTooltip = true,
  tooltipContent = "We only send emails that provide value. No spam, ever."
}: MailchimpSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookError(null);
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send directly to Mailchimp using their embedded form
      const form = e.target as HTMLFormElement;
      form.submit();
      
      // Clear the input and show success message
      setEmail('');
      toast.success("Thank you for subscribing! Check your email to confirm.");
    } catch (error) {
      console.error("Signup error:", error);
      setWebhookError("Unable to process your signup. Please try again later.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div id="mc_embed_signup">
        <form 
          action="https://pulseplace.us21.list-manage.com/subscribe/post?u=e9413013593fc6137371d577d&amp;id=2da64936d1"
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form"
          className="validate flex flex-col space-y-4" 
          target="_blank" 
          onSubmit={handleSubmit}
          noValidate
        >
          <div id="mc_embed_signup_scroll" className="w-full">
            {title && (
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
                {title}
              </h2>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Input 
                  type="email" 
                  name="EMAIL" 
                  id="mce-EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder} 
                  required
                  className="flex-grow pr-8"
                  aria-label="Your email address"
                />
                {showTooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-help">
                          <Info className="h-4 w-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{tooltipContent}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              
              <div className="clear">
                <Button 
                  type="submit" 
                  name="subscribe"
                  id="mc-embedded-subscribe" 
                  className="bg-pulse-gradient hover:opacity-90 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : buttonText}
                </Button>
              </div>
            </div>
            
            {/* Privacy Message */}
            {showPrivacyMessage && (
              <p className="text-xs text-gray-500 mt-2">
                {privacyMessage}
              </p>
            )}
            
            {/* GDPR Compliance Message */}
            {showGdprCompliance && (
              <p className="text-xs text-gray-500 mt-1">
                {gdprCompliance}
              </p>
            )}
            
            {/* Webhook Error Alert */}
            {webhookError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{webhookError}</p>
              </div>
            )}
            
            {/* Hidden field to prevent bot signups */}
            <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
              <input type="text" name="b_e9413013593fc6137371d577d_2da64936d1" tabIndex={-1} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailchimpSignup;
