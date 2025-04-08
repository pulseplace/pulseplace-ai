
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type OnboardingStep = 'welcome' | 'company-profile' | 'first-survey' | 'results-calculation' | 'certification';

export const useOnboarding = () => {
  const { user, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isLoading, setIsLoading] = useState(true);
  const [hasSurveys, setHasSurveys] = useState(false);
  const [hasCertification, setHasCertification] = useState(false);

  // Check user's progress and set the appropriate step
  useEffect(() => {
    const checkProgress = async () => {
      if (!user) {
        setCurrentStep('welcome');
        setIsLoading(false);
        return;
      }

      try {
        // Check if user has completed any surveys
        const { data: surveyData, error: surveyError } = await supabase
          .from('pulse_surveys')
          .select('id')
          .eq('created_by', user.id)
          .limit(1);
        
        if (surveyError) throw surveyError;
        
        const hasSurveyData = surveyData && surveyData.length > 0;
        setHasSurveys(hasSurveyData);
        
        // For demo purposes, we'll assume certification status
        // In a real app, you would check the certification table
        setHasCertification(hasSurveyData);
        
        // Determine current step based on user progress
        if (!profile || !profile.company) {
          setCurrentStep('company-profile');
        } else if (!hasSurveyData) {
          setCurrentStep('first-survey');
        } else if (!hasCertification) {
          setCurrentStep('results-calculation');
        } else {
          setCurrentStep('certification');
        }
      } catch (error) {
        console.error('Error checking onboarding progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkProgress();
  }, [user, profile]);

  const goToNextStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'company-profile', 'first-survey', 'results-calculation', 'certification'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  return {
    currentStep,
    isLoading,
    hasSurveys,
    hasCertification,
    goToNextStep,
    goToStep
  };
};
