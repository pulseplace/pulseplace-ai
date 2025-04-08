
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

interface EmailTestButtonProps {
  recipientEmail?: string;
}

const EmailTestButton = ({ recipientEmail = "hello@pulseplace.ai" }: EmailTestButtonProps) => {
  const [isSending, setIsSending] = useState(false);

  const sendTestCertificationEmail = async () => {
    setIsSending(true);
    
    try {
      toast.info("Sending certification email...");
      
      const testData = {
        recipientEmail,
        companyName: "PulsePlace Demo",
        departmentName: "Product Team",
        certificationId: "demo-" + Date.now(),
        pulseScore: 92,
        themeScores: [
          { theme: "Trust & Safety", score: 95 },
          { theme: "Engagement", score: 90 },
          { theme: "Culture", score: 88 },
          { theme: "Growth & Development", score: 94 },
          { theme: "Wellbeing", score: 93 }
        ],
        insights: {
          summary: "The Product Team has demonstrated an exceptional commitment to building a positive workplace culture.",
          strengths: [
            "Strong emphasis on psychological safety",
            "Excellent team collaboration habits",
            "Clear and transparent communication"
          ],
          opportunities: [
            "Consider additional cross-team collaboration",
            "Explore more work-life balance initiatives"
          ],
          actionItems: [
            "Share certification with team members",
            "Display badge on company careers page",
            "Conduct quarterly check-ins to maintain momentum"
          ]
        },
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      const { data, error } = await supabase.functions.invoke('resend-certification-email', {
        body: testData
      });
      
      if (error) {
        throw error;
      }
      
      toast.success(`Certification email sent to ${recipientEmail}!`, {
        description: "Check your inbox for the certification email."
      });
      
      console.log("Email response:", data);
    } catch (error) {
      console.error("Error sending test email:", error);
      toast.error("Failed to send certification email", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-2">Certification Email Test</h3>
      <p className="text-sm text-gray-500 mb-4">
        Send a test certification email to {recipientEmail}
      </p>
      <Button 
        onClick={sendTestCertificationEmail} 
        disabled={isSending}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        {isSending ? "Sending..." : "Send Test Email"}
      </Button>
    </div>
  );
};

export default EmailTestButton;
