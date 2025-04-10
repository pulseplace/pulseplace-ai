
import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import MetaTags from '@/components/MetaTags';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      <MetaTags
        title="Contact Us | PulsePlace.ai"
        description="Get in touch with our team for questions about PulsePlace.ai, workplace trust metrics, or to schedule a demo."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about PulsePlace.ai? Our team is here to help you improve workplace trust with data-driven insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Send className="h-5 w-5 text-pulse-600" />
                  Send Us a Message
                </h2>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="How can we help you?" rows={5} />
                  </div>
                  
                  <Button className="w-full bg-pulse-gradient">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-pulse-100 p-2 rounded-full mt-1">
                      <Mail className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:hello@pulseplace.ai" className="text-pulse-600 hover:underline">
                        hello@pulseplace.ai
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-pulse-100 p-2 rounded-full mt-1">
                      <Phone className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+15351224597" className="text-pulse-600 hover:underline">
                        +1 (535) 122-4597
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-pulse-100 p-2 rounded-full mt-1">
                      <MapPin className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <address className="not-italic">
                        450 Townsend Street<br />
                        San Francisco, CA 94105
                      </address>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Schedule Demo Card */}
            <Card className="border shadow-sm bg-pulse-50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Schedule a Demo</h2>
                <p className="text-gray-700 mb-6">
                  See PulsePlace.ai in action with a personalized demo tailored to your organization's needs.
                </p>
                <Button className="w-full" asChild>
                  <a href="/book-demo">Book a Demo</a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Calendly Placeholder */}
            <div className="border rounded-lg p-6 bg-gray-50 h-64 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Calendly scheduler will be embedded here for direct booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
