
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

  // Function to get bot state text
  const getBotStateText = () => {
    const botState = botAvatarState.state;
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
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">
          <BotEmoji 
            state={botAvatarState.state} 
            animated={botAvatarState.animated} 
            size={isMobile ? "sm" : "md"} 
          />
        </div>
        <div>
          <div className="font-medium">{getBotStateText()}</div>
          <div className="text-xs text-gray-500">
            {botAvatarState.state === 'typing' || botAvatarState.state === 'thinking'
              ? 'Working on your request...'
              : 'AI assistant powered by PulsePlace'}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
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
              <Button variant="ghost" size="icon">
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
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear History
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Close Button */}
        <Button variant="ghost" size="icon" onClick={toggleChat}>
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
