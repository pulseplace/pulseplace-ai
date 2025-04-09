
import React, { createContext, useContext, useState, useEffect } from 'react';

type TutorialStep = 'welcome' | 'chat' | 'search' | 'language' | 'feedback' | 'complete';

interface TutorialContextType {
  isActive: boolean;
  currentStep: TutorialStep;
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTutorial: () => void;
  goToStep: (step: TutorialStep) => void;
}

const defaultContext: TutorialContextType = {
  isActive: false,
  currentStep: 'welcome',
  startTutorial: () => {},
  endTutorial: () => {},
  nextStep: () => {},
  prevStep: () => {},
  skipTutorial: () => {},
  goToStep: () => {},
};

const TutorialContext = createContext<TutorialContextType>(defaultContext);

export const useTutorial = () => useContext(TutorialContext);

interface TutorialProviderProps {
  children: React.ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<TutorialStep>('welcome');
  
  // Check if tutorial has been completed before
  useEffect(() => {
    const tutorialComplete = localStorage.getItem('pulsebot-tutorial-complete');
    if (!tutorialComplete && window.location.pathname === '/') {
      // Auto-start tutorial only for new users on homepage
      const hasVisitedBefore = localStorage.getItem('pulsebot-visited');
      if (!hasVisitedBefore) {
        // Wait a bit before starting tutorial to let page load completely
        const timer = setTimeout(() => {
          setIsActive(true);
        }, 1500);
        
        // Mark as visited
        localStorage.setItem('pulsebot-visited', 'true');
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const tutorialSteps: TutorialStep[] = ['welcome', 'chat', 'search', 'language', 'feedback', 'complete'];

  const startTutorial = () => {
    setCurrentStep('welcome');
    setIsActive(true);
  };

  const endTutorial = () => {
    setIsActive(false);
    localStorage.setItem('pulsebot-tutorial-complete', 'true');
  };

  const nextStep = () => {
    const currentIndex = tutorialSteps.indexOf(currentStep);
    if (currentIndex < tutorialSteps.length - 1) {
      setCurrentStep(tutorialSteps[currentIndex + 1]);
    } else {
      endTutorial();
    }
  };

  const prevStep = () => {
    const currentIndex = tutorialSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(tutorialSteps[currentIndex - 1]);
    }
  };

  const skipTutorial = () => {
    endTutorial();
  };

  const goToStep = (step: TutorialStep) => {
    setCurrentStep(step);
  };

  return (
    <TutorialContext.Provider 
      value={{
        isActive,
        currentStep,
        startTutorial,
        endTutorial,
        nextStep,
        prevStep,
        skipTutorial,
        goToStep,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
