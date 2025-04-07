import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/emailService";
import { MockPulseScoreData } from '@/types/scoring.types';
import ScoreDisplay from './ScoreDisplay';
import { generateCertificationEmail } from './utils/emailTemplates';

interface CertificationEmailFormProps {
  formData: { to: string };
  certData: MockPulseScoreData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRandomizeScores: () => void;
}

const CertificationEmailForm: React.FC<CertificationEmailFormProps> = ({ 
  formData, 
  certData, 
  onInputChange, 
  onRandomizeScores 
}) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleCertificationEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.to) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    // Replace placeholder values in the email template
    const certificationEmailHtml = generateCertificationEmail(formData.to, certData);
    
    try {
      const result = await emailService.sendEmail({
        to: formData.to,
        subject: 'Your PulsePlace Certification Summary',
        html: certificationEmailHtml
      });
      
      if (!result.success) {
        throw new Error("Failed to send email");
      }
      
      toast({
        title: "Certification Email Sent",
        description: `Certification summary sent to ${formData.to}`,
      });
    } catch (error) {
      console.error('Error sending certification email:', error);
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the certification email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleCertificationEmailSubmit} className="space-y-4">
      <div>
        <label htmlFor="cert-to" className="block text-sm font-medium mb-1">Recipient Email</label>
        <Input
          id="cert-to"
          name="to"
          type="email"
          value={formData.to}
          onChange={onInputChange}
          placeholder="recipient@example.com"
          required
        />
      </div>
      
      <ScoreDisplay 
        certData={certData}
        onRandomize={onRandomizeScores}
      />
      
      <Button type="submit" disabled={isSending} className="w-full">
        {isSending ? 'Sending...' : 'Send Certification Email'}
      </Button>
    </form>
  );
};

export default CertificationEmailForm;
