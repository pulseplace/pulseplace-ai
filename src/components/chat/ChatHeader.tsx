
import React from 'react';
import { X, Settings, Trash2, Bot, BotIcon } from 'lucide-react';
import { BotAvatarState } from './types';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: string;
  languages: { code: string; name: string }[];
  onLanguageChange: (code: string) => void;
  onClose: () => void;
  onClearHistory: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  botAvatarState, 
  language, 
  languages, 
  onLanguageChange, 
  onClose,
  onClearHistory
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-pulse-gradient text-white">
      <div className="flex items-center space-x-2">
        <div 
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            botAvatarState === 'idle' ? "bg-gray-600" : 
            botAvatarState === 'thinking' || botAvatarState === 'typing' ? "bg-yellow-500" : 
            "bg-green-500"
          )}
        >
          <BotIcon className="h-5 w-5 text-white" />
        </div>
        <span className="font-medium">PulseBot</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 hover:bg-white/10 rounded-full text-sm">
            {language.toUpperCase()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map(lang => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={language === lang.code ? "bg-gray-100" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 hover:bg-white/10 rounded-full">
            <Settings className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onClearHistory}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear History
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
