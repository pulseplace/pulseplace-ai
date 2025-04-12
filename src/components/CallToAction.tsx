
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Users, Mail, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { emailService } from '@/services/emailService';

const CallToAction = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !company || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare email HTML
      const contactHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Contact Request</h1>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3>Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `;

      // Send contact request via email
      const emailResult = await emailService.sendEmail({
        to: "contact@pulseplace.ai", // Change to your contact email
        subject: `Contact Request from ${name} at ${company}`,
        html: contactHtml,
        fromName: "PulsePlace Contact Form",
        fromEmail: "noreply@pulseplace.ai",
        replyTo: email
      });

      if (emailResult.success) {
        // Also send confirmation to the user
        const confirmationHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai</h1>
            
            <p style="font-size: 18px;">Hello ${name},</p>
            
            <p>Thank you for reaching out to PulsePlace.ai!</p>
            
            <p>We've received your message and our team will get back to you as soon as possible.</p>
            
            <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
              <h3>Your message:</h3>
              <p style="white-space: pre-line;">${message}</p>
            </div>
            
            <p>Best regards,<br>The PulsePlace Team</p>
            
            <div style="text-align: center; color: #64748b; margin-top: 30px; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>PulsePlace.ai — Redefining workplace trust through data & AI</p>
              <p>© 2025 PulsePlace, Inc. All rights reserved.</p>
            </div>
          </div>
        `;
        
        await emailService.sendEmail({
          to: email,
          subject: "We've received your message - PulsePlace.ai",
          html: confirmationHtml,
          fromName: "PulsePlace Support",
          fromEmail: "contact@pulseplace.ai"
        });
        
        toast.success("Thank you for reaching out! We'll get back to you shortly.");
        
        // Reset form
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setOpen(false);
      } else {
        console.error('Contact form error:', emailResult.error);
        toast.error("There was an issue sending your message. Please try emailing us directly at contact@pulseplace.ai");
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://calendly.com/pulseplace-demo/30min", "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's Build Lovable Workplaces — Together.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <Link to="/join-beta">
              <Button className="bg-pulse-gradient hover:opacity-90 transition-all h-12 px-6 text-base w-full sm:w-auto">
                Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <a 
              href="https://calendly.com/pulseplace-demo/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleDemoClick}
            >
              <Button 
                variant="outline" 
                className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base w-full sm:w-auto"
              >
                Book a Demo <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </a>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base w-full sm:w-auto"
                >
                  Contact Us <Mail className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmitRequest}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Contact Us</DialogTitle>
                    <DialogDescription>
                      Have questions about PulsePlace.ai? Let us know how we can help.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-name" className="text-right">
                        Name
                      </Label>
                      <Input 
                        id="contact-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="col-span-3" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-email" className="text-right">
                        Email
                      </Label>
                      <Input 
                        id="contact-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="col-span-3" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-company" className="text-right">
                        Company
                      </Label>
                      <Input 
                        id="contact-company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-message" className="text-right">
                        Message
                      </Label>
                      <Textarea 
                        id="contact-message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="col-span-3"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      className="bg-pulse-gradient hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
