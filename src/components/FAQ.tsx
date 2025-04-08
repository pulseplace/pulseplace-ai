
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from 'lucide-react';
import { toast } from "sonner";
import { emailService } from '@/services/emailService';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [customQuestion, setCustomQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customQuestion.trim()) {
      toast.error("Please enter your question");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4338ca; text-align: center;">PulsePlace.ai Custom Question</h1>
          
          <p style="font-size: 16px;"><strong>From:</strong> ${email || 'Anonymous user'}</p>
          
          <div style="background-color: #f0f7ff; border-radius: 10px; padding: 15px; margin: 20px 0;">
            <h3>Question:</h3>
            <p style="white-space: pre-line;">${customQuestion}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `;

      await emailService.sendEmail({
        to: "support@pulseplace.ai",
        subject: "Custom FAQ Question",
        html: emailHtml,
        fromName: "PulsePlace AI Support",
        fromEmail: "noreply@pulseplace.ai",
        replyTo: email || undefined
      });
      
      toast.success("Your question has been sent! We'll get back to you soon.");
      setCustomQuestion('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting question:', error);
      toast.error("Failed to send your question. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const faqData = {
    general: [
      {
        question: "What is PulsePlace.ai?",
        answer: "PulsePlace.ai is an AI-powered platform that measures and certifies workplace culture based on real-time employee sentiment and trust. We help organizations identify areas of excellence and improvement, enabling them to build more productive and engaged workplaces."
      },
      {
        question: "How does the PulseScore™ certification work?",
        answer: "The PulseScore™ certification analyzes employee feedback across six key dimensions of workplace culture using our proprietary AI engine. Organizations that meet or exceed our benchmarks receive certification, which they can showcase to attract talent and validate their culture initiatives."
      },
      {
        question: "Is PulsePlace.ai suitable for organizations of all sizes?",
        answer: "Yes! We've designed PulsePlace.ai to work for organizations ranging from small startups to large enterprises. Our system scales appropriately to provide meaningful insights regardless of your company size."
      },
      {
        question: "How long does it take to get certified?",
        answer: "The certification process typically takes 2-4 weeks from start to finish. This includes employee survey participation, data analysis, and certification determination. Results are available immediately after sufficient survey completion."
      }
    ],
    technical: [
      {
        question: "How is data collected for the PulseScore™?",
        answer: "Data is collected through targeted employee surveys with questions specifically designed to assess our six key dimensions of workplace culture. Surveys are anonymous and can be completed on any device in about 5-10 minutes."
      },
      {
        question: "Is my company's data secure?",
        answer: "Absolutely. We maintain the highest standards of data security and privacy. All data is encrypted both in transit and at rest. Individual responses are anonymized, and we never share raw data with third parties without explicit permission."
      },
      {
        question: "How accurate is the AI analysis?",
        answer: "Our AI engine has been trained on extensive workplace culture data and validated against established organizational psychology frameworks. It continuously improves through machine learning, resulting in highly accurate and nuanced analysis of workplace sentiment."
      },
      {
        question: "Can we integrate PulsePlace.ai with our existing HR systems?",
        answer: "Yes, we offer seamless integration with most popular HRIS platforms. This allows for easy deployment and maintenance of the certification process while avoiding data duplication. Contact our support team for specific integration questions."
      }
    ],
    pricing: [
      {
        question: "How much does certification cost?",
        answer: "Pricing depends on your organization size and specific needs. We offer flexible plans starting at $1,500 for small organizations. Request a demo for a customized quote based on your requirements."
      },
      {
        question: "Is there a free trial available?",
        answer: "Yes, eligible organizations can apply for our private beta program, which offers a limited free trial of our platform. Sign up through our 'Join Private Beta' form to see if your organization qualifies."
      },
      {
        question: "Do you offer discounts for non-profits or educational institutions?",
        answer: "Yes, we offer special pricing for qualified non-profits, educational institutions, and B-corporations. Contact our sales team to learn more about these discounts."
      },
      {
        question: "What's included in the certification package?",
        answer: "The certification package includes survey setup and distribution, complete PulseScore™ analysis, detailed insights report, certification badge (if qualified), marketing materials to promote your certification, and a 60-minute consultation to discuss results and recommendations."
      }
    ],
    implementation: [
      {
        question: "How do we get started with PulsePlace.ai?",
        answer: "Getting started is easy! Sign up for the private beta or request a demo through our website. Our team will guide you through the setup process, including survey customization, employee communication templates, and platform training."
      },
      {
        question: "What's the minimum employee participation rate required?",
        answer: "For statistically significant results, we recommend a minimum participation rate of 60%. However, the exact threshold may vary based on your organization's size. Our system will notify you when you've reached adequate participation."
      },
      {
        question: "How often should we renew our certification?",
        answer: "PulsePlace.ai certification is valid for one year. We recommend quarterly pulse checks to monitor ongoing sentiment and make continuous improvements. Annual recertification ensures your workplace culture metrics remain current and accurate."
      },
      {
        question: "Do you provide support during implementation?",
        answer: "Yes, all certification packages include dedicated implementation support. Our customer success team will help you navigate the entire process, from survey setup to result interpretation and action planning."
      }
    ]
  };
  
  const filteredFaqs = Object.entries(faqData).reduce((acc, [category, items]) => {
    const filteredItems = items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {} as Record<string, typeof faqData['general']>);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <div className="relative mb-8">
        <Input
          placeholder="Search for questions..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>
        
        {Object.keys(faqData).map(category => (
          <TabsContent value={category} key={category} className="space-y-4">
            {filteredFaqs[category] && filteredFaqs[category].length > 0 ? (
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaqs[category].map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg p-1">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline">
                      <span className="text-left">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1">
                      <div className="prose prose-sm max-w-none">
                        <p>{item.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : searchQuery ? (
              <div className="text-center py-8">
                <p className="text-lg font-medium">No matching questions found</p>
                <p className="text-gray-500 mt-2">Try adjusting your search or ask us directly below</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg font-medium">No questions in this category</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-12 p-6 border border-purple-200 rounded-xl bg-purple-50">
        <h3 className="text-xl font-bold mb-4">Can't find what you're looking for?</h3>
        <p className="mb-6 text-gray-600">Our AI assistant is here to help! Ask us any question and we'll get back to you as soon as possible.</p>
        
        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <div>
            <Label htmlFor="custom-question" className="block text-sm font-medium text-gray-700">Your Question</Label>
            <Textarea 
              id="custom-question"
              placeholder="Type your question here..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              className="mt-1 w-full h-32"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email (optional)</Label>
            <Input 
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">We'll email you when we respond to your question</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-pulse-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Question'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;
