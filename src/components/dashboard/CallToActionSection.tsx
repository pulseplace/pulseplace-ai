
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
          Join forward-thinking organizations using data to build better workplace cultures.
        </p>
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
