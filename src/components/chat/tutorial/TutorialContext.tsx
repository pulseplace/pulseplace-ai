
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TutorialContextType {
  isEnabled: boolean;
  currentStep: number;
  enableTutorial: () => void;
  disableTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

interface TutorialProviderProps {
  children: ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const enableTutorial = () => setIsEnabled(true);
  const disableTutorial = () => {
    setIsEnabled(false);
    setCurrentStep(0);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const previousStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <TutorialContext.Provider value={{
      isEnabled,
      currentStep,
      enableTutorial,
      disableTutorial,
      nextStep,
      previousStep,
      goToStep
    }}>
      {children}
    </TutorialContext.Provider>
  );
};
