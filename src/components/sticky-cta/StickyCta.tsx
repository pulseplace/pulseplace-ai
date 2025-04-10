
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import BetaRequestDialog from './BetaRequestDialog';
import CtaButton from './CtaButton';

// Mock data since we're disconnecting from Auth temporarily
const mockAuthData = {
  user: null,
  isStepCompleted: (step: string) => false
};

const StickyCta = () => {
  const location = useLocation();
  // Use mock data to avoid Auth errors for now
  const { user } = mockAuthData;
  const { isStepCompleted } = mockAuthData;
  const isMobile = useIsMobile();
  
  const [showDialog, setShowDialog] = useState(false);
  
  const isKeyPage = ['/', '/certification', '/join-beta', '/methodology', '/ai-engine', '/showcase'].includes(location.pathname);
  
  if (!isKeyPage) return null;
  
  // Determine where to send the user based on their auth status and onboarding progress
  const getCtaConfig = () => {
    // If on homepage, show the "Get Pulse Certified" CTA
    if (location.pathname === '/') {
      return {
        text: "Get Pulse Certified",
        link: "/certification",
        icon: "chevron-right"
      };
    }
    
    // If on certification page, point to beta signup
    if (location.pathname === '/certification') {
      return {
        text: "Join the Private Beta",
        action: () => setShowDialog(true),
        icon: "mail"
      };
    }

    // For most pages, if not logged in, point to beta signup
    if (!user) {
      return {
        text: "Join the Private Beta",
        action: () => setShowDialog(true),
        icon: "mail"
      };
    }
    
    // If logged in but not completed first survey
    if (!isStepCompleted('first-survey')) {
      return {
        text: "Continue Certification",
        link: "/dashboard",
        icon: "chevron-right"
      };
    }
    
    // If completed survey but not certification
    if (!isStepCompleted('certification')) {
      return {
        text: "Complete Certification",
        link: "/dashboard/certification-engine",
        icon: "chevron-right"
      };
    }
    
    // If certified
    return {
      text: "View Your Certification",
      link: "/dashboard/share-certification",
      icon: "chevron-right"
    };
  };
  
  const ctaConfig = getCtaConfig();
  
  return (
    <>
      <div className={`fixed ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'} z-30 animate-fade-in`}>
        <CtaButton 
          config={ctaConfig}
          isMobile={isMobile}
          onActionClick={() => ctaConfig.action && ctaConfig.action()}
        />
      </div>
      
      <BetaRequestDialog 
        open={showDialog} 
        onOpenChange={setShowDialog} 
      />
    </>
  );
};

export default StickyCta;
