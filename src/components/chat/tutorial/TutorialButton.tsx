
import React from 'react';
import { useTutorial } from './TutorialContext';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const TutorialButton: React.FC = () => {
  const { startTutorial } = useTutorial();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={startTutorial}
            className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
            aria-label="Start Tutorial"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Start PulseBot Tutorial</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
