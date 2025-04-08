
import React from 'react';
import { Message, BotAvatarState, MessageLanguage } from '../types';
import { cn } from '@/lib/utils';
import { X, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChatMessages } from './ChatMessages';
import { ChatInputBox } from '../ChatInputBox';
import { SearchBar } from '../SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
        isMobile 
          ? 'bottom-24 right-2 left-2 max-h-[calc(100vh-150px)]' 
          : 'bottom-24 right-6 w-80 sm:w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)]',
        open
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-pulse-gradient text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <h3 className="font-semibold">PulsePlace Assistant</h3>
            <p className="text-xs text-white/80">How can I help you today?</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
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
      <div className="p-2 border-b">
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
      <div className="p-3 border-t bg-white">
        <ChatInputBox
          onSendMessage={sendMessage}
          loading={loading}
          onClearHistory={clearHistory}
        />
      </div>
    </div>
  );
};
