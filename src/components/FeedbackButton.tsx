
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { emailService } from '@/services/emailService';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const FeedbackButton = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  // Auto-populate user details if logged in
  React.useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      // Try to get name from profile data if available
      const profile = user.user_metadata;
      if (profile) {
        const firstName = profile.first_name || '';
        const lastName = profile.last_name || '';
        if (firstName || lastName) {
          setName(`${firstName} ${lastName}`.trim());
        }
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Please enter some feedback before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Preparing to send feedback via email');
      
      // Prepare email HTML
      const feedbackHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Feedback</h1>
          
          <p style="font-size: 16px;"><strong>From:</strong> ${name || 'Anonymous user'}</p>
          <p style="font-size: 16px;"><strong>Email:</strong> ${email || 'Not provided'}</p>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
            <h3>Feedback:</h3>
            <p style="white-space: pre-line;">${feedback}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `;

      // Send feedback via email
      const emailResult = await emailService.sendEmail({
        to: "feedback@pulseplace.ai", 
        subject: `Website Feedback${name ? ' from ' + name : ''}`,
        html: feedbackHtml,
        fromName: "PulsePlace Feedback System",
        fromEmail: "noreply@pulseplace.ai",
        replyTo: email || undefined
      });

      if (emailResult.success) {
        toast.success("Thank you for your feedback!");
        setFeedback('');
        setEmail('');
        setName('');
        setIsOpen(false);
      } else {
        console.error('Feedback email error:', emailResult.error);
        toast.error("There was an issue sending your feedback. Please try again later.");
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className={`fixed ${isMobile ? 'bottom-16 left-4' : 'bottom-6 left-6'} z-40 rounded-full bg-pulse-600 hover:bg-pulse-700 shadow-lg p-3 h-auto`}
          size="icon"
          aria-label="Provide feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Provide Feedback</DialogTitle>
          <DialogDescription>
            Help us improve PulsePlace.ai by sharing your thoughts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Your Name (Optional)
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">
                Your Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
              <p className="text-xs text-gray-500">We'll only use this to follow up on your feedback if needed.</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="feedback" className="text-left">
                What's on your mind? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you like, what could be improved, or report any bugs you've found..."
                className="min-h-[120px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-pulse-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
