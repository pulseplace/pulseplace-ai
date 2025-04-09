
import React from 'react';
import { X, Languages, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BotEmoji } from '../BotEmoji';
import { BotAvatarState, MessageLanguage } from '../types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { TutorialButton } from '../tutorial/TutorialButton';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  handleLanguageChange: (value: MessageLanguage) => void;
  toggleChat: () => void;
  onClearHistory: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  botAvatarState,
  language,
  languages,
  handleLanguageChange,
  toggleChat,
  onClearHistory
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-pulse-gradient text-white rounded-t-lg shrink-0">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <BotEmoji state={botAvatarState} size="sm" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">PulseBot AI Assistant</h3>
          <p className="text-xs text-white/80">How can I help you today?</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!isMobile && (
          <Select value={language} onValueChange={handleLanguageChange} className="language-selector">
            <SelectTrigger className="h-8 w-[110px] bg-white/10 border-white/20 text-white text-xs">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {/* More options dropdown for mobile (language + clear) */}
        {isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/20 text-white language-selector">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.value} 
                  onClick={() => handleLanguageChange(lang.value)}
                  className={lang.value === language ? "bg-gray-100" : ""}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              <DropdownMenuItem onClick={onClearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {/* Tutorial button */}
        <TutorialButton />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleChat}
          className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
};
