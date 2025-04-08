
import React from 'react';
import { Globe, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Language {
  code: string;
  name: string;
}

interface ChatHeaderProps {
  botAvatarState: 'idle' | 'typing' | 'happy' | 'thinking';
  language: string;
  languages: Language[];
  onLanguageChange: (lang: string) => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  botAvatarState,
  language,
  languages,
  onLanguageChange,
  onClose
}) => {
  return (
    <div className="bg-pulse-gradient text-white p-3 rounded-t-lg flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Avatar className={cn(
          "h-8 w-8 bg-white/20",
          botAvatarState === 'typing' && "animate-pulse",
          botAvatarState === 'happy' && "animate-bounce"
        )}>
          <AvatarImage src="" alt="PulseBot" />
          <AvatarFallback className="text-white">
            {botAvatarState === 'idle' && <Sparkles className="h-4 w-4" />}
            {botAvatarState === 'typing' && <span className="text-xs">🤔</span>}
            {botAvatarState === 'happy' && <span className="text-xs">😊</span>}
            {botAvatarState === 'thinking' && <span className="text-xs">💭</span>}
          </AvatarFallback>
        </Avatar>
        <div>
          <span className="font-medium">PulseBot</span>
          <p className="text-xs text-white/80">Your workplace guide</p>
        </div>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="text-white hover:bg-white/20 rounded-full p-1 mr-1"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={cn(
                  "cursor-pointer",
                  language === lang.code && "font-bold bg-gray-100"
                )}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button 
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
