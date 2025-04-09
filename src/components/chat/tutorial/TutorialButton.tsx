
import React, { useState } from 'react';
import { useTutorial } from './TutorialContext';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PulseBotDocumentation } from '../documentation/PulseBotDocumentation';

export const TutorialButton: React.FC = () => {
  const { startTutorial } = useTutorial();
  const [showDocumentation, setShowDocumentation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
                  aria-label="Help Options"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Get Help & Documentation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={startTutorial}>
            Start Tutorial
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDocumentation(true)}>
            View Documentation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Documentation Dialog */}
      <PulseBotDocumentation
        open={showDocumentation}
        onClose={() => setShowDocumentation(false)}
      />
    </>
  );
};
