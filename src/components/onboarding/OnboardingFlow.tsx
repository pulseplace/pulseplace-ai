
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding, OnboardingStep } from '@/hooks/useOnboarding';
import OnboardingState from '@/components/OnboardingState';
import OnboardingForm from '@/components/OnboardingForm';
import OnboardingStepIndicator from './OnboardingStepIndicator';
import { Loader2, ArrowLeft, ArrowRight, Check, HelpCircle, X } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [showHelp, setShowHelp] = useState(false);
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
  
  const currentStepInfo = {
    welcome: {
      title: "Welcome to PulsePlace",
      description: "This wizard will guide you through setting up your workplace certification. Follow the steps to create your profile, conduct your first survey, and get your certification."
    },
    'company-profile': {
      title: "Complete Your Company Profile",
      description: "Tell us about your organization so we can personalize your experience and provide relevant benchmarks."
    },
    'first-survey': {
      title: "Create Your First Survey",
      description: "Set up your first survey to start gathering employee feedback and begin your certification journey."
    },
    'results-calculation': {
      title: "Processing Your Results",
      description: "We're analyzing your survey data using our AI engine to generate insights about your organization."
    },
    certification: {
      title: "Your Certification Is Ready",
      description: "Congratulations! You've completed all steps needed to receive your workplace certification."
    }
  }[currentStep];
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div>
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertDescription className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  Welcome to your certification journey! This guided process will help you
                  establish your workplace culture baseline and earn your Pulse Certification™.
                  The entire process takes approximately 15-20 minutes.
                </span>
              </AlertDescription>
            </Alert>
            <OnboardingState 
              stateType="welcome" 
              onButtonClick={goToNextStep} 
            />
          </div>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium mb-1">Step 1</h3>
                <p className="text-sm text-gray-500">Company Profile Completed</p>
              </div>
              
              <div className="p-4 bg-pulse-50 rounded-lg border border-pulse-200 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-pulse-100 flex items-center justify-center mb-2">
                  <span className="font-medium text-pulse-700">2</span>
                </div>
                <h3 className="font-medium mb-1">Step 2</h3>
                <p className="text-sm text-gray-500">Create Your Survey</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center text-center opacity-60">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <span className="font-medium text-gray-400">3</span>
                </div>
                <h3 className="font-medium mb-1">Step 3</h3>
                <p className="text-sm text-gray-500">Get Certified</p>
              </div>
            </div>
            
            <OnboardingState 
              stateType="emptyDashboard" 
              onButtonClick={handleGetStarted} 
            />
          </div>
        );
      
      case 'results-calculation':
        return (
          <div>
            <div className="flex justify-center mb-6">
              <div className="animate-pulse flex items-center gap-3 bg-blue-50 text-blue-700 py-3 px-6 rounded-full">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing your survey data...</span>
              </div>
            </div>
            <OnboardingState 
              stateType="surveyThanks" 
              onButtonClick={goToNextStep} 
            />
            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                className="text-gray-500"
                onClick={() => navigate('/dashboard/certification-engine')}
              >
                View processing details
              </Button>
            </div>
          </div>
        );
      
      case 'certification':
        return (
          <div>
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3 bg-green-50 text-green-700 py-3 px-6 rounded-full">
                <Check className="h-5 w-5" />
                <span>Your certification is ready!</span>
              </div>
            </div>
            <OnboardingState 
              stateType="scoreLive" 
              onButtonClick={handleViewCertification} 
            />
          </div>
        );
      
      default:
        return <div>Unknown step</div>;
    }
  };
  
  const canGoBack = currentStep !== 'welcome' && currentStep !== 'certification';
  const canGoForward = isStepCompleted(currentStep) && currentStep !== 'certification';
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card className="mb-6 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Onboarding Progress</CardTitle>
              <CardDescription>
                {currentStepInfo.description}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHelp(!showHelp)}
            >
              {showHelp ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Hide Help
                </>
              ) : (
                <>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need Help?
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage()} className="h-2 mb-4" />
          
          <div className="relative">
            <OnboardingStepIndicator 
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={goToStep}
            />
          </div>
          
          {showHelp && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md text-sm text-blue-700">
              <h3 className="font-medium mb-2">Help for this step:</h3>
              {currentStep === 'welcome' && (
                <p>Welcome to PulsePlace! To get started, just click the 'Get Your PulseScore' button. The onboarding process will guide you through setting up your profile and running your first survey.</p>
              )}
              {currentStep === 'company-profile' && (
                <p>Fill out the form with your company information. This helps us tailor the experience to your organization's size and industry. All fields marked with * are required.</p>
              )}
              {currentStep === 'first-survey' && (
                <p>Click 'Take the Pulse Survey' to create your first employee feedback survey. You can customize questions or use our templates designed to measure workplace culture.</p>
              )}
              {currentStep === 'results-calculation' && (
                <p>Our AI is analyzing your survey responses to calculate your PulseScore. This usually takes just a few moments to complete.</p>
              )}
              {currentStep === 'certification' && (
                <p>Congratulations! You can now view and share your certification. Click the button to access sharing options for your website and social media.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {renderStepContent()}
      
      <div className="mt-6 flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => canGoBack ? navigate(-1) : navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          {canGoBack ? "Back" : "Go to Dashboard"}
        </Button>
        
        <div className="flex gap-3">
          {currentStep !== 'welcome' && currentStep !== 'company-profile' && (
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          )}
          
          {canGoForward && (
            <Button 
              onClick={goToNextStep}
              className="bg-pulse-gradient flex items-center gap-2"
            >
              Next Step
              <ArrowRight size={16} />
            </Button>
          )}
          
          {currentStep === 'certification' && (
            <Button 
              onClick={handleViewCertification}
              className="bg-pulse-gradient"
            >
              View & Share Certification
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
