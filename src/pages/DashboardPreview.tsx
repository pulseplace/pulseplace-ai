
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingDemo from "@/components/dashboard/OnboardingDemo";
import DashboardUI from "@/components/dashboard/DashboardUI";
import DashboardFeatures from "@/components/dashboard/DashboardFeatures";
import CallToActionSection from "@/components/dashboard/CallToActionSection";

const DashboardPreview = () => {
  const { toast } = useToast();
  const [showDemo, setShowDemo] = useState(true);
  
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
  
  const toggleDemo = () => {
    setShowDemo(!showDemo);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-pulse-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PulsePlace Dashboard Preview
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the insights and analytics that will transform your workplace culture.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link to="/join-beta">
                <Button size="lg" className="bg-pulse-gradient hover:opacity-90" onClick={handleRequestDemo}>
                  Request Full Demo
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50" onClick={handleViewPricing}>
                  View Pricing
                </Button>
              </Link>
            </div>
            
            <div className="max-w-md mx-auto">
              <Button 
                variant="outline" 
                onClick={toggleDemo} 
                className="border-pulse-300 text-pulse-700 hover:bg-pulse-50"
              >
                {showDemo ? "Show Dashboard UI" : "Show Onboarding Flow"}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {showDemo ? (
              <OnboardingDemo />
            ) : (
              <DashboardUI />
            )}
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Experience the Full Dashboard</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                This is just a preview. The full dashboard includes advanced analytics, 
                customizable reports, and personalized AI recommendations.
              </p>
              <Link to="/join-beta">
                <Button className="bg-pulse-gradient" onClick={handleRequestDemo}>
                  Schedule a Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <DashboardFeatures />
        
        {/* CTA Section */}
        <CallToActionSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPreview;
