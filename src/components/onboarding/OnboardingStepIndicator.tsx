
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { OnboardingStep } from '@/hooks/useOnboarding';

interface OnboardingStepIndicatorProps {
  steps: { key: OnboardingStep; label: string }[];
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  onStepClick: (step: OnboardingStep) => void;
}

const OnboardingStepIndicator: React.FC<OnboardingStepIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const isStepCompleted = (step: OnboardingStep) => completedSteps.includes(step);
  
  return (
    <div className="flex justify-between mt-2">
      {steps.map((step, index) => (
        <div 
          key={step.key} 
          className={`flex flex-col items-center cursor-pointer transition-colors ${
            currentStep === step.key 
              ? 'text-pulse-700 font-medium' 
              : isStepCompleted(step.key) 
                ? 'text-green-600'
                : 'text-gray-400'
          }`}
          onClick={() => isStepCompleted(step.key) && onStepClick(step.key)}
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
              <span>{index + 1}</span>
            )}
          </div>
          <span className="text-xs text-center">{step.label}</span>
          
          {/* Progress line between steps */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute left-0 right-0 h-0.5 top-4 -z-10">
              <div className={`h-full ${
                isStepCompleted(step.key) && isStepCompleted(steps[index + 1].key)
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OnboardingStepIndicator;
