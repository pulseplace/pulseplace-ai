
import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BotAvatarState } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: string;
  languages: { code: string; name: string }[];
  onLanguageChange: (lang: string) => void;
  onClose: () => void;
  onClearHistory: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  botAvatarState,
  language,
  languages,
  onLanguageChange,
  onClose,
  onClearHistory,
}) => {
  // Helper function to get avatar classes based on bot state
  const getAvatarClasses = () => {
    switch (botAvatarState) {
      case 'typing':
        return 'animate-pulse bg-yellow-500';
      case 'happy':
        return 'bg-green-500';
      case 'thinking':
        return 'animate-pulse bg-blue-500';
      default:
        return 'bg-pulse-600';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-pulse-600 to-pulse-700 text-white rounded-t-lg">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
            getAvatarClasses()
          )}
        >
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <h3 className="font-semibold">PulseBot</h3>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors">
            {language.toUpperCase()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={cn(
                  'text-sm',
                  language === lang.code && 'font-bold bg-accent'
                )}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear History Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onClearHistory}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Clear chat history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
