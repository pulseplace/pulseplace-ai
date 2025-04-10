
import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface BetaRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BetaRequestDialog = ({ open, onOpenChange }: BetaRequestDialogProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Preparing to send beta request');
      
      const betaRequestHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Private Beta Request</h1>
          
          <div style="background-color: #f7f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line;">${message || 'No additional message provided.'}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `;

      // Mock email service response for now
      const result = { success: true };
      
      if (result.success) {
        toast.success("Thank you for your interest! We'll be in touch soon.");
        onOpenChange(false);
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
      } else {
        console.error("Email service error:");
        toast.error("There was an issue sending your request. Please try again.");
      }
    } catch (error) {
      console.error('Beta request submission error:', error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the Private Beta</DialogTitle>
          <DialogDescription>
            Get early access to PulsePlace.ai and be among the first to receive Pulse Certification.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Name (Optional)</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input 
                id="company" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your organization and why you're interested in PulsePlace.ai..."
                className="mt-1 h-24"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-pulse-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Access'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BetaRequestDialog;
