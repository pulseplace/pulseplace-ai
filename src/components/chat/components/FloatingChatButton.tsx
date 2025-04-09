
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { BotEmoji } from '../BotEmoji';
import { BotAvatarStateValue } from '../types';

interface FloatingChatButtonProps {
  open: boolean;
  toggleChat: () => void;
  botState: BotAvatarStateValue;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  open, 
  toggleChat,
  botState = 'idle'
}) => {
  const isMobile = useIsMobile();
  
  // Additional validation for bot state
  const validBotState = ['idle', 'thinking', 'typing', 'happy'].includes(botState) 
    ? botState 
    : 'idle';
  
  // Safe position that works across all device sizes
  const buttonPositionClass = isMobile 
    ? 'bottom-4 right-4 z-40' 
    : 'bottom-6 right-6 z-40';
  
  // Size that works across all device sizes  
  const buttonSizeClass = isMobile
    ? 'h-12 w-12'
    : 'h-14 w-14';
  
  return (
    <div className={`fixed ${buttonPositionClass} flex flex-col items-end space-y-2`}>
      {/* Only show tooltip on desktop */}
      {!isMobile ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleChat}
                className={cn(
                  `${buttonSizeClass} rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`,
                  open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
                )}
                aria-label={open ? "Close chat" : "Talk to PulseBot"}
              >
                {open ? (
                  <X className="h-5 w-5 md:h-6 md:w-6 text-white mx-auto" />
                ) : (
                  <BotEmoji state={validBotState} size={isMobile ? "sm" : "md"} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Talk to PulseBot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <button
          onClick={toggleChat}
          className={cn(
            `${buttonSizeClass} rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`,
            open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
          )}
          aria-label={open ? "Close chat" : "Talk to PulseBot"}
        >
          {open ? (
            <X className="h-5 w-5 text-white mx-auto" />
          ) : (
            <BotEmoji state={validBotState} size="sm" />
          )}
        </button>
      )}
    </div>
  );
};
