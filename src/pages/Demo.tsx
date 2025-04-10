
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import MetaTags from '@/components/MetaTags';

const Demo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Demo Request Submitted",
        description: "We'll contact you shortly to schedule your demo.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <MetaTags 
        title="Book a Demo | PulsePlace.ai"
        description="Schedule a personalized demo of PulsePlace.ai's workplace trust measurement and certification platform."
        keywords="trust measurement demo, workplace analytics, book demo, PulsePlace demo"
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Personalized Demo</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how PulsePlace.ai can help you measure, analyze, and improve workplace trust.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Your Demo</CardTitle>
                  <CardDescription>
                    Fill out the form and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="john@company.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input 
                        id="company" 
                        name="company" 
                        placeholder="Company Inc." 
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help you?</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="I'm interested in learning more about..." 
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-pulse-gradient"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Book My Demo <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-base">30-Minute Demo Session</h3>
                      <p className="text-sm text-gray-600">
                        A personalized walkthrough of the PulsePlace platform tailored to your needs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="h-4 w-4 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-base">No Pressure Discussion</h3>
                      <p className="text-sm text-gray-600">
                        Learn how our platform works and ask any questions about implementation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-base">Follow-up Resources</h3>
                      <p className="text-sm text-gray-600">
                        We'll send you additional information and resources after the demo.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alternative Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Not ready for a full demo? Try one of these options:
                  </p>
                  <div className="flex flex-col space-y-3">
                    <Button variant="outline" asChild>
                      <a href="/join-beta" className="w-full justify-between">
                        Join Beta Program
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/ai-engine" className="w-full justify-between">
                        See AI Engine
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Have questions? Contact us directly at{' '}
              <a href="mailto:demo@pulseplace.ai" className="text-pulse-600 hover:underline">
                demo@pulseplace.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
