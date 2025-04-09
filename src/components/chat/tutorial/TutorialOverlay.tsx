
import React from 'react';
import { useTutorial } from './TutorialContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TutorialOverlay: React.FC = () => {
  const { isActive, currentStep, nextStep, prevStep, skipTutorial, endTutorial } = useTutorial();

  // Define content for each step
  const tutorialContent = {
    welcome: {
      title: 'Welcome to PulseBot!',
      description: 'Let\'s take a quick tour to help you get the most out of your AI assistant.',
      image: '👋',
    },
    chat: {
      title: 'Chat with PulseBot',
      description: 'Ask questions about culture surveys, PulseScore, or certification. Type your message in the input field and press Enter or click the send button.',
      image: '💬',
    },
    search: {
      title: 'Search Your History',
      description: 'Looking for a previous conversation? Use the search bar to quickly find messages in your chat history.',
      image: '🔍',
    },
    language: {
      title: 'Language Options',
      description: 'PulseBot speaks multiple languages! Change the language from the dropdown in the header to get responses in your preferred language.',
      image: '🌐',
    },
    feedback: {
      title: 'Provide Feedback',
      description: 'Help us improve by rating responses with thumbs up or down. Your feedback makes PulseBot smarter.',
      image: '👍',
    },
    complete: {
      title: 'You\'re All Set!',
      description: 'Now you know how to use PulseBot. Feel free to explore and ask any questions about PulsePlace and workplace culture.',
      image: '🎉',
    },
  };

  // Show the current step content
  const content = tutorialContent[currentStep];
  
  // Show previous button for all steps except the first
  const showPrevButton = currentStep !== 'welcome';
  
  // Show next button text based on step
  const nextButtonText = currentStep === 'complete' ? 'Finish' : 'Next';

  return (
    <Dialog open={isActive} onOpenChange={(open) => !open && skipTutorial()}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <div className="flex flex-col">
          {/* Progress indicator */}
          <div className="w-full bg-gray-200 h-1">
            <div 
              className="bg-pulse-600 h-1 transition-all duration-300"
              style={{ 
                width: `${(Object.keys(tutorialContent).indexOf(currentStep) + 1) / Object.keys(tutorialContent).length * 100}%` 
              }}
            />
          </div>
          
          {/* Icon and title */}
          <div className="bg-pulse-gradient text-white p-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{content.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipTutorial}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="text-4xl mb-4">{content.image}</div>
              <p className="text-gray-600">{content.description}</p>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <div>
                {showPrevButton && (
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  onClick={skipTutorial}
                  className="text-gray-500"
                >
                  Skip
                </Button>
                <Button 
                  onClick={nextStep}
                  className="bg-pulse-gradient flex items-center gap-1"
                >
                  {nextButtonText}
                  {currentStep !== 'complete' && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
