
import React, { useState } from 'react';
import { BotEmoji } from '../BotEmoji';
import { X, Trash2, Globe, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BotAvatarState, MessageLanguage } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ClearHistoryDialog } from './ClearHistoryDialog';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  handleLanguageChange: (language: MessageLanguage) => void;
  toggleChat: () => void;
  onClearHistory?: () => void;
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
  isMobile = false,
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleOpenConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmClear = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setIsConfirmDialogOpen(false);
  };

  // Extract the state and animated values based on the type of botAvatarState
  const getBotState = () => {
    if (typeof botAvatarState === 'string') {
      return botAvatarState;
    } else if (botAvatarState && typeof botAvatarState === 'object' && 'status' in botAvatarState) {
      return botAvatarState.status;
    }
    return 'idle';
  };

  const isAnimated = () => {
    if (typeof botAvatarState === 'object' && botAvatarState && 'animated' in botAvatarState) {
      return !!botAvatarState.animated;
    }
    return true; // Default to true if not specified
  };

  // Function to get bot state text
  const getBotStateText = () => {
    const botState = getBotState();
    switch (botState) {
      case 'idle':
        return 'PulseBot';
      case 'thinking':
        return 'Thinking...';
      case 'typing':
        return 'Typing...';
      case 'happy':
        return 'PulseBot';
      default:
        return 'PulseBot';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">
          <BotEmoji 
            state={getBotState()} 
            animated={isAnimated()} 
            size={isMobile ? "sm" : "md"} 
          />
        </div>
        <div>
          <div className="font-medium">{getBotStateText()}</div>
          <div className="text-xs text-gray-300">
            {getBotState() === 'typing' || getBotState() === 'thinking'
              ? 'Working on your request...'
              : 'AI assistant powered by PulsePlace'}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={language === lang.value ? 'bg-muted' : ''}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Actions Dropdown */}
        {(onClearHistory || onExportChat) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Chat Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onExportChat && (
                <DropdownMenuItem onClick={onExportChat}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Chat
                </DropdownMenuItem>
              )}
              {onClearHistory && (
                <DropdownMenuItem 
                  onClick={handleOpenConfirmDialog}
                  className="text-accent hover:text-accent hover:bg-accent/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear History
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Close Button */}
        <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/10">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Clear History Confirmation Dialog */}
      <ClearHistoryDialog
        open={isConfirmDialogOpen}
        onConfirm={handleConfirmClear}
        onCancel={handleCloseConfirmDialog}
      />
    </div>
  );
};
