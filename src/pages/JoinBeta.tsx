
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { emailService } from '@/services/emailService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(1, {
    message: "Company name is required.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const JoinBetaPage: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await emailService.sendBetaRequest(
        values.name,
        values.email,
        values.company,
        values.message
      );
      
      if (response.success) {
        setIsSuccess(true);
        toast({
          title: "Request Submitted",
          description: "Your beta access request has been submitted successfully.",
        });
      } else {
        toast({
          title: "Submission Error",
          description: response.error || "There was an error submitting your request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Beta request submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    },
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-md"
            >
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
              <p className="text-gray-600 mb-6">
                Your request to join our private beta has been submitted successfully. 
                We'll review your application and get back to you shortly.
              </p>
              <Button asChild className="bg-pulse-gradient">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md">
                  <h1 className="text-2xl font-bold mb-6">Join the PulsePlace Private Beta</h1>
                  <p className="text-gray-600 mb-4">
                    Be among the first to leverage our trust analytics platform and get exclusive early access benefits.
                  </p>
                  
                  <div className="space-y-4 my-8">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Priority Access</h3>
                        <p className="text-sm text-gray-500">Get immediate access to all features ahead of general release</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Dedicated Support</h3>
                        <p className="text-sm text-gray-500">Direct access to our customer success team for personalized onboarding</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Influence Product Direction</h3>
                        <p className="text-sm text-gray-500">Your feedback will directly shape our product roadmap</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Exclusive Pricing</h3>
                        <p className="text-sm text-gray-500">Special pricing locked in for beta participants</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-6">Request Beta Access</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@company.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your company size, industry, and what you're hoping to achieve with PulsePlace..." 
                                className="resize-none min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-pulse-gradient"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Request Beta Access'
                        )}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JoinBetaPage;
