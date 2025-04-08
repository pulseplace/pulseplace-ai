
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/hooks/useOnboarding';

const StickyCta = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { currentStep, isStepCompleted } = useOnboarding();
  
  const isKeyPage = ['/', '/certification', '/join-beta', '/methodology', '/ai-engine', '/showcase'].includes(location.pathname);
  
  if (!isKeyPage) return null;
  
  // Determine where to send the user based on their auth status and onboarding progress
  const getCtaConfig = () => {
    // If on homepage, show the "Get Pulse Certified" CTA
    if (location.pathname === '/') {
      return {
        text: "Get Pulse Certified",
        link: "/certification"
      };
    }
    
    // If not logged in, point to beta signup
    if (!user) {
      return {
        text: "Join the Private Beta",
        link: "/join-beta"
      };
    }
    
    // If logged in but not completed first survey
    if (!isStepCompleted('first-survey')) {
      return {
        text: "Continue Certification",
        link: "/dashboard"
      };
    }
    
    // If completed survey but not certification
    if (!isStepCompleted('certification')) {
      return {
        text: "Complete Certification",
        link: "/dashboard/certification-engine"
      };
    }
    
    // If certified
    return {
      text: "View Your Certification",
      link: "/dashboard/share-certification"
    };
  };
  
  const ctaConfig = getCtaConfig();
  
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Link to={ctaConfig.link}>
        <Button 
          className="bg-pulse-gradient hover:opacity-90 transition-all font-medium px-4 py-2 shadow-lg rounded-full group"
          size="lg"
        >
          {ctaConfig.text}
          <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default StickyCta;
