
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
  
  // Use responsive positioning based on device type
  const positionClasses = {
    mobile: 'bottom-4 right-4 z-50',
    desktop: 'bottom-6 right-6 z-50'
  };
  
  // Use responsive sizing based on device type
  const sizeClasses = {
    mobile: 'h-12 w-12',
    desktop: 'h-14 w-14'
  };
  
  // Determine the position and size based on device type
  const buttonPositionClass = isMobile ? positionClasses.mobile : positionClasses.desktop;
  const buttonSizeClass = isMobile ? sizeClasses.mobile : sizeClasses.desktop;
  
  // Add pulsing animation for better visibility when bot is in specific states
  const shouldPulse = !open && (botState === 'happy' || botState === 'typing');
  const pulseAnimation = shouldPulse ? 'animate-pulse' : '';
  
  return (
    <div className={`fixed ${buttonPositionClass} flex flex-col items-end space-y-2`}>
      {/* Optional label that appears above the button on mobile */}
      {!open && isMobile && (
        <div className="bg-white rounded-full px-3 py-1 shadow-sm mb-1 text-sm">
          <span>Ask PulseBot</span>
        </div>
      )}
      
      {/* Use Tooltip only on desktop devices */}
      {!isMobile ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleChat}
                className={cn(
                  `${buttonSizeClass} rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`,
                  open 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : `bg-pulse-gradient ${pulseAnimation} hover:bg-pulse-700`
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
              <p>{open ? "Close chat" : "Talk to PulseBot"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <button
          onClick={toggleChat}
          className={cn(
            `${buttonSizeClass} rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`,
            open 
              ? 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800' 
              : `bg-pulse-gradient ${pulseAnimation} hover:bg-pulse-700 active:bg-pulse-800`
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
