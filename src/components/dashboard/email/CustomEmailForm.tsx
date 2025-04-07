
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/emailService";

interface CustomEmailFormProps {
  formData: {
    to: string;
    subject: string;
    html: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomEmailForm: React.FC<CustomEmailFormProps> = ({ formData, onInputChange }) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const result = await emailService.sendEmail({
        to: formData.to,
        subject: formData.subject,
        html: formData.html
      });
      
      if (!result.success) {
        throw new Error("Failed to send email");
      }
      
      toast({
        title: "Email Sent Successfully",
        description: `Email has been sent to ${formData.to}`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label htmlFor="to" className="block text-sm font-medium mb-1">Recipient Email</label>
        <Input
          id="to"
          name="to"
          type="email"
          value={formData.to}
          onChange={onInputChange}
          placeholder="recipient@example.com"
          required
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={onInputChange}
          placeholder="Email subject"
          required
        />
      </div>
      
      <div>
        <label htmlFor="html" className="block text-sm font-medium mb-1">Email Content (HTML)</label>
        <Textarea
          id="html"
          name="html"
          value={formData.html}
          onChange={onInputChange}
          placeholder="<p>Your HTML email content here</p>"
          rows={6}
          required
        />
      </div>
      
      <Button type="submit" disabled={isSending}>
        {isSending ? 'Sending...' : 'Send Test Email'}
      </Button>
    </form>
  );
};

export default CustomEmailForm;
