
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Mail, MessageSquare, Phone, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { emailService } from '@/services/emailService';
import MetaTags from '@/components/MetaTags';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
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
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
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
        to: "contact@pulseplace.ai",
        subject: `Contact Request from ${name} - ${inquiryType || 'General Inquiry'}`,
        html: contactHtml,
        fromName: "PulsePlace Contact Form",
        fromEmail: "noreply@pulseplace.ai",
        replyTo: email
      });

      if (emailResult.success) {
        toast.success("Thank you for reaching out! We'll get back to you shortly.");
        
        // Reset form
        setName('');
        setEmail('');
        setCompany('');
        setPhone('');
        setInquiryType('');
        setMessage('');
      } else {
        console.error('Contact form error:', emailResult.error);
        toast.error("There was an issue sending your message. Please try again later.");
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Contact Us | PulsePlace.ai" 
        description="Get in touch with the PulsePlace.ai team for questions, demos, or support."
      />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about PulsePlace.ai? Our team is here to help. Reach out using the form below or connect directly.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-pulse-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:hello@pulseplace.ai" className="text-pulse-600 hover:underline">hello@pulseplace.ai</a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-pulse-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+15551234567" className="text-pulse-600 hover:underline">+1 (555) 123-4567</a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-pulse-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium">Office</p>
                          <p className="text-gray-600">
                            350 Townsend Street<br />
                            San Francisco, CA 94107
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <div className="space-y-2">
                      <Link to="/join-beta" className="block text-pulse-600 hover:underline">Request a Demo</Link>
                      <Link to="/about-us" className="block text-pulse-600 hover:underline">Meet Our Team</Link>
                      <Link to="/certification" className="block text-pulse-600 hover:underline">Certification Process</Link>
                      <Link to="/resources" className="block text-pulse-600 hover:underline">Resources & Learning</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Your name" 
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="your.email@example.com" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            value={company} 
                            onChange={(e) => setCompany(e.target.value)} 
                            placeholder="Your company name" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="+1 (555) 123-4567" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="inquiry-type">Inquiry Type</Label>
                        <Select value={inquiryType} onValueChange={setInquiryType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Information</SelectItem>
                            <SelectItem value="demo">Request a Demo</SelectItem>
                            <SelectItem value="pricing">Pricing Information</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                        <Textarea 
                          id="message" 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)} 
                          placeholder="How can we help you?" 
                          className="min-h-[150px]" 
                          required 
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-pulse-gradient hover:opacity-90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <MessageSquare className="h-5 w-5 text-pulse-600 mr-2" />
                    How quickly will I receive a response?
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to all inquiries within 24 business hours. For urgent matters, please indicate this in your message.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <Users className="h-5 w-5 text-pulse-600 mr-2" />
                    Can I schedule a demo for my team?
                  </h3>
                  <p className="text-gray-600">
                    Yes! Select "Request a Demo" from the inquiry type dropdown, and our team will coordinate a time that works for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
