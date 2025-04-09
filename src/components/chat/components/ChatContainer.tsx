
import React, { useEffect } from 'react';
import { Message, BotAvatarState, MessageLanguage } from '../types';
import { cn } from '@/lib/utils';
import { X, Languages, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChatMessages } from './ChatMessages';
import { ChatInputBox } from '../ChatInputBox';
import { SearchBar } from '../SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { BotEmoji } from '../BotEmoji';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ChatContainerProps {
  open: boolean;
  loading: boolean;
  messages: Message[];
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleFeedback: (messageId: string, message: Message, feedback: 'up' | 'down') => void;
  handleLanguageChange: (value: MessageLanguage) => void;
  toggleChat: () => void;
  search: { query: string; results: Message[] };
  handleSearch: (query: string) => void;
  clearSearch: () => void;
  clearHistory: () => void;
  sendMessage: (message: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  open,
  loading,
  messages,
  botAvatarState,
  language,
  languages,
  messagesEndRef,
  handleFeedback,
  handleLanguageChange,
  toggleChat,
  search,
  handleSearch,
  clearSearch,
  clearHistory,
  sendMessage,
}) => {
  const isMobile = useIsMobile();
  const [clearConfirmOpen, setClearConfirmOpen] = React.useState(false);
  
  // When component mounts or 'open' state changes, handle body scroll
  useEffect(() => {
    // If chat is open on mobile, prevent body scroll
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isMobile]);
  
  const handleClearConfirm = () => {
    clearHistory();
    setClearConfirmOpen(false);
  };
  
  return (
    <>
      <div
        className={cn(
          'fixed z-50 flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
          isMobile 
            ? 'inset-0 m-2 max-h-[calc(100vh-16px)]' 
            : 'bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)]',
          open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* Header */}
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
              <Select value={language} onValueChange={handleLanguageChange}>
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/20 text-white">
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
                  <DropdownMenuItem onClick={() => setClearConfirmOpen(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
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

        {/* Search bar */}
        <div className="p-2 border-b shrink-0">
          <SearchBar
            query={search.query}
            onSearch={handleSearch}
            onClear={clearSearch}
          />
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          <ChatMessages
            messages={search.query ? search.results : messages}
            loading={loading}
            botAvatarState={botAvatarState}
            handleFeedback={handleFeedback}
            messagesEndRef={messagesEndRef}
            isSearching={!!search.query}
          />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white shrink-0">
          <ChatInputBox
            onSendMessage={sendMessage}
            loading={loading}
            onClearHistory={() => setClearConfirmOpen(true)}
          />
        </div>
      </div>
      
      {/* Clear history confirmation dialog */}
      <Dialog open={clearConfirmOpen} onOpenChange={setClearConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Chat History</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear your chat history? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleClearConfirm}>Clear History</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
