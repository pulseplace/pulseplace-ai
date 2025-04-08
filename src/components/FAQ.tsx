
import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const faqs = [
  {
    question: "How does PulsePlace.ai measure workplace culture?",
    answer: "PulsePlace.ai uses a combination of AI-powered pulse surveys, sentiment analysis, and natural language processing to gather and analyze employee feedback. Our platform then benchmarks this data against industry standards to provide actionable insights."
  },
  {
    question: "What makes PulseScore™ different from other culture metrics?",
    answer: "Unlike traditional surveys that provide static snapshots, PulseScore™ offers real-time culture ratings based on continuous feedback. It's powered by advanced AI that can identify patterns and trends that human analysis might miss."
  },
  {
    question: "How long does it take to implement PulsePlace.ai?",
    answer: "Most organizations can be up and running with PulsePlace.ai in just 1-2 weeks. Our team provides comprehensive onboarding support to ensure a smooth implementation process."
  },
  {
    question: "What size companies can benefit from PulsePlace.ai?",
    answer: "PulsePlace.ai is designed to scale with your organization. We serve companies ranging from startups with 10+ employees to enterprise organizations with thousands of team members."
  },
  {
    question: "How does Pulse Certification work?",
    answer: "Organizations that achieve high PulseScores and demonstrate exceptional workplace cultures can earn Pulse Certification. This certification is based on objective data rather than subjective testimonials, making it a truly merit-based recognition."
  },
  {
    question: "Is my company's data secure with PulsePlace.ai?",
    answer: "Absolutely. We take data security very seriously. All data is encrypted, stored securely, and we never share your specific company data with others. Employee feedback is always anonymized to protect individual privacy."
  },
  {
    question: "Can we customize the surveys for our specific workplace?",
    answer: "Yes, while we have core metrics that enable benchmarking, PulsePlace.ai allows for customization of surveys to address your company's specific culture goals and areas of focus."
  },
  {
    question: "How is the AI trained to understand workplace sentiment?",
    answer: "Our AI models are trained on millions of workplace interactions and feedback data points, with special attention to cultural nuances and industry-specific language. We continuously improve our models with anonymized feedback from our growing customer base."
  },
  {
    question: "What happens if our score is lower than expected?",
    answer: "We provide detailed insights and actionable recommendations tailored to your specific challenges. Our platform highlights strengths to leverage and areas for improvement, with step-by-step guidance on how to enhance your workplace culture."
  },
  {
    question: "How often should we reassess our workplace culture?",
    answer: "For optimal results, we recommend monthly pulse surveys and quarterly comprehensive assessments. This cadence allows you to track progress, identify emerging trends, and make timely adjustments to your workplace initiatives."
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [email, setEmail] = useState('');
  
  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleQuestionClick = (question: string) => {
    if (activeQuestion === question) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(question);
    }
  };
  
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the question via email
    console.log('Custom question submitted:', { question: customQuestion, email });
    setCustomQuestion('');
    setEmail('');
    setShowContactDialog(false);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about measuring and improving your workplace culture with PulsePlace.ai
          </p>
        </div>
        
        {/* AI-style search bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-full pl-10 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-pulse-500 focus:ring-pulse-500"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && filteredFaqs.length === 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4 text-center">
              <p className="mb-2">We couldn't find an answer to your question.</p>
              <Button 
                className="bg-pulse-600" 
                onClick={() => {
                  setCustomQuestion(searchQuery);
                  setShowContactDialog(true);
                }}
              >
                Ask us directly <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Chat-style FAQ display */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium flex items-center justify-center">
                <HelpCircle className="mr-2 h-5 w-5 text-pulse-600" />
                PulsePlace.ai Support Chat
              </h3>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto" style={{ minHeight: '400px' }}>
              {/* AI welcome message */}
              <div className="flex mb-6">
                <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-pulse-600 text-sm font-bold">AI</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p>Hello! I'm the PulsePlace.ai assistant. How can I help you learn more about our platform?</p>
                </div>
              </div>
              
              {searchQuery ? (
                // Show search results
                filteredFaqs.length > 0 ? (
                  <>
                    <div className="flex mb-6">
                      <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-pulse-600 text-sm font-bold">AI</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p>Here's what I found for "{searchQuery}":</p>
                      </div>
                    </div>
                    
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex mb-2">
                          <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0 mr-3">
                            <span className="text-pulse-600 text-sm font-bold">AI</span>
                          </div>
                          <button 
                            onClick={() => handleQuestionClick(faq.question)}
                            className={`text-left bg-gray-100 rounded-lg p-3 max-w-[80%] hover:bg-gray-200 transition-colors ${activeQuestion === faq.question ? 'bg-gray-200' : ''}`}
                          >
                            <p className="font-medium">{faq.question}</p>
                          </button>
                        </div>
                        
                        {activeQuestion === faq.question && (
                          <div className="flex ml-12">
                            <div className="bg-pulse-50 border border-pulse-100 rounded-lg p-3 max-w-[80%]">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : null
              ) : (
                // Show list of common questions
                <>
                  <div className="flex mb-6">
                    <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-pulse-600 text-sm font-bold">AI</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p>Here are some frequently asked questions:</p>
                    </div>
                  </div>
                  
                  {faqs.slice(0, 5).map((faq, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex mb-2">
                        <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center flex-shrink-0 mr-3">
                          <span className="text-pulse-600 text-sm font-bold">AI</span>
                        </div>
                        <button 
                          onClick={() => handleQuestionClick(faq.question)}
                          className={`text-left bg-gray-100 rounded-lg p-3 max-w-[80%] hover:bg-gray-200 transition-colors ${activeQuestion === faq.question ? 'bg-gray-200' : ''}`}
                        >
                          <p className="font-medium">{faq.question}</p>
                        </button>
                      </div>
                      
                      {activeQuestion === faq.question && (
                        <div className="flex ml-12">
                          <div className="bg-pulse-50 border border-pulse-100 rounded-lg p-3 max-w-[80%]">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-600"
                >
                  View common questions
                </Button>
                
                <Button 
                  className="bg-pulse-600"
                  onClick={() => setShowContactDialog(true)}
                >
                  Ask a different question
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="bg-pulse-100 p-4 rounded-full text-pulse-600 mb-4 sm:mb-0 sm:mr-6">
                <Mail className="h-8 w-8" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold mb-2">Want to learn more?</h3>
                <p className="text-gray-600 mb-4">Our team is ready to help you understand how PulsePlace.ai can work for your organization.</p>
                <Button 
                  className="bg-pulse-600 hover:bg-pulse-700"
                  onClick={() => setShowContactDialog(true)}
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ask Your Question</DialogTitle>
            <DialogDescription>
              Our team will get back to you with the answer as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAskQuestion}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="custom-question">Your Question</Label>
                <Textarea
                  id="custom-question"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="What would you like to know about PulsePlace.ai?"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Your Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
                <p className="text-xs text-gray-500">We'll send the answer to this email address.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowContactDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-pulse-600">
                Send Question <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FAQ;
