
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { BotEmoji } from '../BotEmoji';

interface FloatingChatButtonProps {
  open: boolean;
  toggleChat: () => void;
  botState: 'idle' | 'thinking' | 'typing' | 'happy';
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  open, 
  toggleChat,
  botState = 'idle'
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`fixed ${isMobile ? 'bottom-16 right-4' : 'bottom-6 right-6'} z-40 flex flex-col items-end space-y-2`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleChat}
              className={cn(
                `h-12 w-12 ${isMobile ? 'md:h-14 md:w-14' : 'h-14 w-14'} rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`,
                open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
              )}
              aria-label={open ? "Close chat" : "Talk to PulseBot"}
            >
              {open ? (
                <X className="h-5 w-5 md:h-6 md:w-6 text-white mx-auto" />
              ) : (
                <BotEmoji state={botState} size="md" />
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
