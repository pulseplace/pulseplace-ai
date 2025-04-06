
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about measuring and improving your workplace culture with PulsePlace.ai
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-lg py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
