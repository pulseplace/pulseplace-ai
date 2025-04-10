
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, CheckCircle2, Clock, Mail, MessageSquare } from "lucide-react";
import MetaTags from '@/components/MetaTags';
import { toast } from 'sonner';

const Demo = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    employeeCount: '',
    message: '',
    submitted: false,
    loading: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        loading: false,
        submitted: true 
      }));
      toast.success("Demo request submitted successfully!");
    }, 1500);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <MetaTags 
        title="Book a Demo | PulsePlace.ai"
        description="Schedule a personalized demo of PulsePlace.ai's workplace trust measurement platform."
        keywords="demo booking, workplace culture, trust metrics, AI HR analytics"
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Experience PulsePlace.ai in Action</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book a personalized demo to see how our platform can help you measure, 
              track, and improve workplace trust at your organization.
            </p>
          </motion.div>
          
          {!formState.submitted ? (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">What to Expect</motion.h2>
                
                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pulse-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">30-Minute Session</h3>
                      <p className="text-gray-600">A focused overview of our platform tailored to your needs</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pulse-100 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Interactive Q&A</h3>
                      <p className="text-gray-600">Get answers to your specific questions</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pulse-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">No Obligation</h3>
                      <p className="text-gray-600">Learn how our platform works with no pressure</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Popular Demo Topics</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• How the PulseScore™ measures workplace trust</li>
                    <li>• Setting up your first trust assessment</li>
                    <li>• Understanding AI-powered trend analysis</li>
                    <li>• Certification process and sharing options</li>
                    <li>• Integration with existing HR systems</li>
                  </ul>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-6">Book Your Demo</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formState.name} 
                          onChange={handleInputChange} 
                          placeholder="John Smith" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formState.email} 
                          onChange={handleInputChange} 
                          placeholder="john@company.com" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input 
                          id="company" 
                          name="company" 
                          value={formState.company} 
                          onChange={handleInputChange} 
                          placeholder="Company, Inc." 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employeeCount">Company Size</Label>
                        <Input 
                          id="employeeCount" 
                          name="employeeCount" 
                          value={formState.employeeCount} 
                          onChange={handleInputChange} 
                          placeholder="e.g., 50-100 employees" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">What would you like to learn about?</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          value={formState.message} 
                          onChange={handleInputChange} 
                          placeholder="I'm particularly interested in..." 
                          rows={3} 
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-pulse-gradient" 
                        disabled={formState.loading}
                      >
                        {formState.loading ? (
                          <>
                            <span className="animate-spin mr-2">◌</span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Schedule Demo
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to our{" "}
                        <a href="/terms-of-service" className="text-pulse-600 hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="/privacy-policy" className="text-pulse-600 hover:underline">Privacy Policy</a>.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Demo Request Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thanks for your interest in PulsePlace.ai. We'll reach out shortly to schedule your personalized demo.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-pulse-600" />
                  <span className="font-medium">Check your inbox</span>
                </div>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email to <span className="font-semibold">{formState.email}</span> with more details.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}>
                  Request Another Demo
                </Button>
                <Button className="bg-pulse-gradient" asChild>
                  <a href="/features">Explore Features</a>
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Testimonials or social proof could go here */}
        </div>
      </div>
    </div>
  );
};

export default Demo;
