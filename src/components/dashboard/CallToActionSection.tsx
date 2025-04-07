
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CallToActionSection = () => {
  const { toast } = useToast();
  
  const handleRequestDemo = () => {
    toast({
      title: "Demo Request Sent",
      description: "Our team will contact you shortly to schedule a full demo",
    });
  };
  
  const handleViewPricing = () => {
    toast({
      description: "Redirecting to pricing page",
    });
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Workplace?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Join forward-thinking organizations using PulsePlace visualizations to build better workplace cultures.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-gray-50 p-6 rounded-lg text-left">
            <h3 className="text-lg font-semibold mb-3">Deep Insights Dashboard</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Team Pulse Tracking</span>
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sentiment Analysis</span>
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Skills Gap Analysis</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-left">
            <h3 className="text-lg font-semibold mb-3">AI-Powered Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Predictive Attrition Alerts</span>
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Culture Improvement Recommendations</span>
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Benchmark Comparisons</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/pricing">
            <Button size="lg" className="bg-pulse-gradient hover:opacity-90" onClick={handleViewPricing}>
              View Pricing Plans
            </Button>
          </Link>
          <Link to="/join-beta">
            <Button size="lg" variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50" onClick={handleRequestDemo}>
              Request a Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
