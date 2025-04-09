
import React, { useEffect, useState } from 'react';
import { useTutorial } from './TutorialContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, X, SkipForward, Search, Globe, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the highlight positions for each step
type HighlightPosition = {
  top: string;
  left: string;
  width: string;
  height: string;
  element: string;
};

export const TutorialOverlay: React.FC = () => {
  const { isActive, currentStep, nextStep, prevStep, skipTutorial, endTutorial } = useTutorial();
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition | null>(null);

  // Function to find and set highlight positions based on current step
  useEffect(() => {
    if (!isActive) return;

    const findElement = (selector: string) => {
      const element = document.querySelector(selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          element: selector
        };
      }
      return null;
    };

    // Set timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      let position = null;
      
      switch (currentStep) {
        case 'chat':
          position = findElement('.chat-input-field');
          break;
        case 'search':
          position = findElement('.search-bar-container input');
          break;
        case 'language':
          position = findElement('.language-selector');
          break;
        case 'feedback':
          position = findElement('.message-feedback');
          break;
        default:
          position = null;
      }
      
      setHighlightPosition(position);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentStep, isActive]);

  // Define content for each step
  const tutorialContent = {
    welcome: {
      title: 'Welcome to PulseBot!',
      description: 'Let\'s take a quick tour to help you get the most out of your AI assistant.',
      image: '👋',
      icon: null,
    },
    chat: {
      title: 'Chat with PulseBot',
      description: 'Ask questions about culture surveys, PulseScore, or certification. Type your message in the input field and press Enter or click the send button.',
      image: '💬',
      icon: null,
    },
    search: {
      title: 'Search Your History',
      description: 'Looking for a previous conversation? Use the search bar to quickly find messages in your chat history.',
      image: '🔍',
      icon: <Search className="h-5 w-5 mb-2" />,
    },
    language: {
      title: 'Language Options',
      description: 'PulseBot speaks multiple languages! Change the language from the dropdown in the header to get responses in your preferred language.',
      image: '🌐',
      icon: <Globe className="h-5 w-5 mb-2" />,
    },
    feedback: {
      title: 'Provide Feedback',
      description: 'Help us improve by rating responses with thumbs up or down. Your feedback makes PulseBot smarter.',
      image: '👍',
      icon: <ThumbsUp className="h-5 w-5 mb-2" />,
    },
    complete: {
      title: 'You\'re All Set!',
      description: 'Now you know how to use PulseBot. Feel free to explore and ask any questions about PulsePlace and workplace culture.',
      image: '🎉',
      icon: null,
    },
  };

  // Show the current step content
  const content = tutorialContent[currentStep];
  
  // Show previous button for all steps except the first
  const showPrevButton = currentStep !== 'welcome';
  
  // Show next button text based on step
  const nextButtonText = currentStep === 'complete' ? 'Finish' : 'Next';

  return (
    <>
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
            
            {/* Icon and title with skip button */}
            <div className="bg-pulse-gradient text-white p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{content.title}</h3>
              <div className="flex items-center gap-2">
                {/* Prominent Skip Tutorial button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTutorial}
                  className="text-white hover:bg-white/20 h-8"
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  Skip Tutorial
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={skipTutorial}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="text-4xl mb-4">
                  {content.icon || content.image}
                </div>
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
                <div>
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

      {/* Visual highlight overlay for specific UI elements */}
      {isActive && highlightPosition && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div 
            className="absolute border-2 border-pulse-500 animate-pulse rounded-md"
            style={{
              top: highlightPosition.top,
              left: highlightPosition.left,
              width: highlightPosition.width,
              height: highlightPosition.height,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)',
              zIndex: 50,
            }}
          >
            {/* Add pulse indicator on the highlighted element */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-pulse-600 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-pulse-600 rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
};
