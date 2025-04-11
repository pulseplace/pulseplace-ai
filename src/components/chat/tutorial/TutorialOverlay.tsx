
import React from 'react';
import { useTutorial } from './TutorialContext';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

export const TutorialOverlay: React.FC = () => {
  const { isEnabled, currentStep, disableTutorial, nextStep, previousStep } = useTutorial();
  
  if (!isEnabled) return null;
  
  // Define tutorial steps
  const steps = [
    {
      title: 'Welcome to PulseBot!',
      content: 'Let me show you how to use the chat interface to get the most out of PulseBot.',
      targetSelector: '#pulsebot-container'
    },
    {
      title: 'Ask Questions',
      content: 'Type your questions about workplace culture, PulseScore, or certification here.',
      targetSelector: '.chat-footer'
    },
    {
      title: 'Provide Feedback',
      content: 'Help us improve by rating PulseBot\'s responses with thumbs up or down.',
      targetSelector: '.chat-messages'
    },
    {
      title: 'Change Settings',
      content: 'Access settings to switch language or export your chat history.',
      targetSelector: '.chat-header'
    }
  ];
  
  // If we've gone beyond the last step, end the tutorial
  if (currentStep >= steps.length) {
    disableTutorial();
    return null;
  }
  
  const currentTutorialStep = steps[currentStep];
  
  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {currentTutorialStep.title}
          </h3>
          <Button variant="ghost" size="sm" onClick={disableTutorial}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="mb-6 text-gray-600">
          {currentTutorialStep.content}
        </p>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={nextStep}>
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
