
import React, { useState } from 'react';
import { X, Bot, MoreHorizontal, Trash2, Download, FileJson, FilePdf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BotAvatarState, MessageLanguage } from '../types';
import { BotEmoji } from '../BotEmoji';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  handleLanguageChange: (language: MessageLanguage) => void;
  toggleChat: () => void;
  onClearHistory: () => void;
  onExportChat?: () => void;
  exportFormat?: 'json' | 'pdf';
  onExportFormatChange?: (format: 'json' | 'pdf') => void;
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
  exportFormat = 'json',
  onExportFormatChange,
  isMobile = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Helper to get bot state for display
  const getBotEmoji = () => {
    if (typeof botAvatarState === 'string') {
      return botAvatarState;
    } else if (botAvatarState && 'status' in botAvatarState) {
      return botAvatarState.status;
    }
    return 'idle';
  };
  
  // Handle language change
  const handleLanguageSelect = (value: string) => {
    handleLanguageChange(value as MessageLanguage);
  };
  
  // Handle clear chat confirmation
  const handleClearConfirm = () => {
    onClearHistory();
    setIsDialogOpen(false);
  };
  
  // Handle export format change
  const handleExportFormatChange = (format: 'json' | 'pdf') => {
    if (onExportFormatChange) {
      onExportFormatChange(format);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BotEmoji state={getBotEmoji()} />
          <div>
            <h3 className="font-semibold text-gray-800">PulseBot</h3>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Language selector */}
          <Select value={language} onValueChange={handleLanguageSelect}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Menu dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {/* Clear chat history */}
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Clear Chat</span>
              </DropdownMenuItem>
              
              {/* Export chat history */}
              {onExportChat && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onExportChat} className="cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export Chat</span>
                  </DropdownMenuItem>
                  
                  {/* Export format selection */}
                  {onExportFormatChange && (
                    <>
                      <DropdownMenuItem 
                        onClick={() => handleExportFormatChange('json')}
                        className={cn("cursor-pointer", exportFormat === 'json' && "bg-gray-100")}
                      >
                        <FileJson className="mr-2 h-4 w-4" />
                        <span>JSON Format</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleExportFormatChange('pdf')}
                        className={cn("cursor-pointer", exportFormat === 'pdf' && "bg-gray-100")}
                      >
                        <FilePdf className="mr-2 h-4 w-4" />
                        <span>PDF Format</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Close button */}
          <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
      
      {/* Clear chat confirmation dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Clear Chat History</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear your chat history? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleClearConfirm}>
              Clear History
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
