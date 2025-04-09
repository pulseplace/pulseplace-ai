
import React, { useState } from 'react';
import { X, MoreVertical, Languages, Trash2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { BotEmoji } from '../BotEmoji';
import { BotAvatarState, MessageLanguage } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClearHistoryDialog } from './ClearHistoryDialog';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  handleLanguageChange: (language: MessageLanguage) => void;
  toggleChat: () => void;
  onClearHistory: () => void;
  onExportChat?: () => void;
  isMobile?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  botAvatarState,
  language,
  languages,
  handleLanguageChange,
  toggleChat,
  onClearHistory,
  onExportChat,
  isMobile = false
}) => {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  
  // Get the appropriate bot state
  const botState = typeof botAvatarState === 'string' 
    ? botAvatarState 
    : botAvatarState?.status || 'idle';

  const handleClearHistory = () => {
    setClearDialogOpen(true);
  };

  const confirmClearHistory = () => {
    onClearHistory();
    setClearDialogOpen(false);
  };

  const cancelClearHistory = () => {
    setClearDialogOpen(false);
  };

  return (
    <>
      <div className={cn(
        "flex items-center justify-between px-4 py-3 bg-pulse-gradient text-white",
        isMobile ? "rounded-none" : "rounded-t-lg"
      )}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <BotEmoji state={botState} size="sm" />
          </div>
          <h3 className="font-semibold text-sm md:text-base">PulseBot Assistant</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language selector (simplified on mobile) */}
          {!isMobile ? (
            <Select 
              value={language} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-[80px] h-8 bg-white bg-opacity-10 border-none text-white text-xs">
                <SelectValue placeholder={language.toUpperCase()} />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20">
                  <Languages className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.value}
                    onClick={() => handleLanguageChange(lang.value)}
                    className={cn(
                      "cursor-pointer",
                      language === lang.value && "bg-muted"
                    )}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Additional actions menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleClearHistory} className="cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
              </DropdownMenuItem>
              {onExportChat && (
                <DropdownMenuItem onClick={onExportChat} className="cursor-pointer">
                  <Download className="mr-2 h-4 w-4" />
                  Export Chat
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            className="h-8 w-8 text-white hover:bg-white hover:bg-opacity-20"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
      
      {/* Clear history confirmation dialog */}
      <ClearHistoryDialog
        open={clearDialogOpen}
        onConfirm={confirmClearHistory}
        onCancel={cancelClearHistory}
      />
    </>
  );
};
