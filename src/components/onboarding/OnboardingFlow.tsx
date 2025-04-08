
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding, OnboardingStep } from '@/hooks/useOnboarding';
import OnboardingState from '@/components/OnboardingState';
import OnboardingForm from '@/components/OnboardingForm';
import { Loader2 } from 'lucide-react';

const OnboardingFlow: React.FC = () => {
  const { currentStep, isLoading, goToNextStep } = useOnboarding();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleOnboardingFormSubmit = (data: any) => {
    toast({
      title: "Profile Updated",
      description: "Your company profile has been saved",
    });
    goToNextStep();
  };
  
  const handleGetStarted = () => {
    navigate('/dashboard/surveys/new');
  };
  
  const handleViewCertification = () => {
    navigate('/dashboard/share-certification');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-pulse-600" />
      </div>
    );
  }
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <OnboardingState 
            stateType="welcome" 
            onButtonClick={goToNextStep} 
          />
        );
      
      case 'company-profile':
        return (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Complete Your Company Profile</h2>
              <p className="text-gray-600 mb-6">
                To get started with PulsePlace, we need some information about your organization.
                This helps us personalize your experience and provide relevant benchmarks.
              </p>
              <OnboardingForm onFormSubmit={handleOnboardingFormSubmit} />
            </CardContent>
          </Card>
        );
      
      case 'first-survey':
        return (
          <OnboardingState 
            stateType="emptyDashboard" 
            onButtonClick={handleGetStarted} 
          />
        );
      
      case 'results-calculation':
        return (
          <OnboardingState 
            stateType="surveyThanks" 
            onButtonClick={goToNextStep} 
          />
        );
      
      case 'certification':
        return (
          <OnboardingState 
            stateType="scoreLive" 
            onButtonClick={handleViewCertification} 
          />
        );
      
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {renderStepContent()}
      
      {currentStep !== 'welcome' && currentStep !== 'company-profile' && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mx-2"
          >
            Go to Dashboard
          </Button>
          
          {currentStep === 'certification' && (
            <Button 
              onClick={handleViewCertification}
              className="mx-2 bg-pulse-gradient"
            >
              View & Share Certification
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
