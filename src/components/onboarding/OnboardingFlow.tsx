
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding, OnboardingStep } from '@/hooks/useOnboarding';
import OnboardingState from '@/components/OnboardingState';
import OnboardingForm from '@/components/OnboardingForm';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const OnboardingFlow: React.FC = () => {
  const { 
    currentStep, 
    isLoading, 
    goToNextStep,
    goToStep,
    completedSteps,
    progressPercentage,
    isStepCompleted
  } = useOnboarding();
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

  // Define steps for the progress tracker
  const steps: { key: OnboardingStep; label: string }[] = [
    { key: 'welcome', label: 'Welcome' },
    { key: 'company-profile', label: 'Company Profile' },
    { key: 'first-survey', label: 'First Survey' },
    { key: 'results-calculation', label: 'Results' },
    { key: 'certification', label: 'Certification' }
  ];
  
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage()} className="h-2 mb-4" />
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div 
                key={step.key} 
                className={`flex flex-col items-center cursor-pointer transition-colors ${
                  currentStep === step.key 
                    ? 'text-pulse-700 font-medium' 
                    : isStepCompleted(step.key) 
                      ? 'text-green-600'
                      : 'text-gray-400'
                }`}
                onClick={() => isStepCompleted(step.key) && goToStep(step.key)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep === step.key 
                    ? 'bg-pulse-100 text-pulse-700 border-2 border-pulse-600' 
                    : isStepCompleted(step.key) 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {isStepCompleted(step.key) ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{steps.indexOf(step) + 1}</span>
                  )}
                </div>
                <span className="text-xs text-center">{step.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
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
