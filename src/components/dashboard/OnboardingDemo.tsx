
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import OnboardingState from "@/components/OnboardingState";
import OnboardingForm, { OnboardingFormData } from "@/components/OnboardingForm";

const OnboardingDemo = () => {
  const { toast } = useToast();
  const [currentState, setCurrentState] = useState('welcome');
  
  const handleButtonClick = () => {
    if (currentState === 'welcome') {
      setCurrentState('form');
    } else if (currentState === 'emptyDashboard') {
      setCurrentState('surveyThanks');
      
      // Simulate survey processing
      setTimeout(() => {
        setCurrentState('scoreLive');
      }, 3000);
    } else if (currentState === 'scoreLive') {
      toast({
        title: "Benchmarks",
        description: "Viewing industry benchmarks..."
      });
    }
  };
  
  const handleFormSubmit = (data: OnboardingFormData) => {
    console.log("Form submitted:", data);
    setCurrentState('surveyThanks');
    
    // Simulate survey processing
    setTimeout(() => {
      setCurrentState('scoreLive');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto my-12">
      {currentState === 'welcome' && (
        <OnboardingState stateType="welcome" onButtonClick={handleButtonClick} />
      )}
      
      {currentState === 'form' && (
        <OnboardingForm onFormSubmit={handleFormSubmit} />
      )}
      
      {currentState === 'emptyDashboard' && (
        <OnboardingState stateType="emptyDashboard" onButtonClick={handleButtonClick} />
      )}
      
      {currentState === 'surveyThanks' && (
        <OnboardingState stateType="surveyThanks" />
      )}
      
      {currentState === 'scoreLive' && (
        <OnboardingState stateType="scoreLive" onButtonClick={handleButtonClick} />
      )}
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">Demo Controls (Not visible in actual product)</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={() => setCurrentState('welcome')}>
            Welcome State
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('form')}>
            Onboarding Form
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('emptyDashboard')}>
            Empty Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('surveyThanks')}>
            Post-Survey
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('scoreLive')}>
            Score Live
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDemo;
