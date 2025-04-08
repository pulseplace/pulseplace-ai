
import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FloatingChatButtonProps {
  open: boolean;
  toggleChat: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ open, toggleChat }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleChat}
              className={cn(
                'h-14 w-14 rounded-full shadow-lg transition-all duration-300',
                open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
              )}
              aria-label={open ? "Close chat" : "Talk to PulseBot"}
            >
              {open ? (
                <X className="h-6 w-6 text-white mx-auto" />
              ) : (
                <Sparkles className="h-6 w-6 text-white mx-auto" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Talk to PulseBot</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
