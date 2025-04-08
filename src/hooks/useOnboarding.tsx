
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type OnboardingStep = 'welcome' | 'company-profile' | 'first-survey' | 'results-calculation' | 'certification';

export const useOnboarding = () => {
  const { user, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isLoading, setIsLoading] = useState(true);
  const [hasSurveys, setHasSurveys] = useState(false);
  const [hasCertification, setHasCertification] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>([]);
  const [lastVisitedStep, setLastVisitedStep] = useState<OnboardingStep | null>(null);
  const { toast } = useToast();

  // Check user's progress and set the appropriate step
  useEffect(() => {
    const checkProgress = async () => {
      if (!user) {
        setCurrentStep('welcome');
        setIsLoading(false);
        return;
      }

      try {
        // Get last visited step from localStorage if available
        const savedStep = localStorage.getItem('lastOnboardingStep');
        if (savedStep) {
          setLastVisitedStep(savedStep as OnboardingStep);
        }
        
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
        
        // Determine current step based on user progress and build completed steps array
        const completed: OnboardingStep[] = ['welcome'];
        
        if (profile && profile.company) {
          completed.push('company-profile');
        }
        
        if (hasSurveyData) {
          completed.push('first-survey');
          completed.push('results-calculation');
        }
        
        if (hasCertification) {
          completed.push('certification');
        }
        
        setCompletedSteps(completed);
        
        // Set current step to the next incomplete step or the last visited one if it's completed
        let nextStep: OnboardingStep;
        
        if (!profile || !profile.company) {
          nextStep = 'company-profile';
        } else if (!hasSurveyData) {
          nextStep = 'first-survey';
        } else if (!hasCertification) {
          nextStep = 'results-calculation';
        } else {
          nextStep = 'certification';
        }
        
        // If there's a saved step and it's either completed or the next step, use it
        if (savedStep && (completed.includes(savedStep as OnboardingStep) || savedStep === nextStep)) {
          setCurrentStep(savedStep as OnboardingStep);
        } else {
          setCurrentStep(nextStep);
        }
      } catch (error) {
        console.error('Error checking onboarding progress:', error);
        toast({
          title: "Error",
          description: "Could not fetch your onboarding progress",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkProgress();
  }, [user, profile, toast]);

  const goToNextStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'company-profile', 'first-survey', 'results-calculation', 'certification'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep);
      localStorage.setItem('lastOnboardingStep', nextStep);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    localStorage.setItem('lastOnboardingStep', step);
  };

  // Calculate overall progress percentage
  const progressPercentage = () => {
    const steps: OnboardingStep[] = ['welcome', 'company-profile', 'first-survey', 'results-calculation', 'certification'];
    const lastCompletedIndex = steps.findIndex(step => !completedSteps.includes(step)) - 1;
    const actualCompleted = lastCompletedIndex < 0 ? 0 : lastCompletedIndex + 1;
    return Math.round((actualCompleted / steps.length) * 100);
  };

  const isStepCompleted = (step: OnboardingStep) => {
    return completedSteps.includes(step);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('lastOnboardingStep');
    setCurrentStep('welcome');
    // In a real app, you might want to reset the user's progress in the database as well
  };

  return {
    currentStep,
    isLoading,
    hasSurveys,
    hasCertification,
    goToNextStep,
    goToStep,
    completedSteps,
    progressPercentage,
    isStepCompleted,
    resetOnboarding,
    lastVisitedStep
  };
};
