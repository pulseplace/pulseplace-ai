
import React from 'react';
import { cn } from '@/lib/utils';
import { ChatHeader } from '../ChatHeader';
import { SearchBar } from '../SearchBar';
import { ChatMessages } from './ChatMessages';
import { ChatInputBox } from '../ChatInputBox';
import { BotAvatarState, Message } from '../types';

interface ChatContainerProps {
  open: boolean;
  loading: boolean;
  messages: Message[];
  botAvatarState: BotAvatarState;
  language: string;
  languages: { code: string; name: string }[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleFeedback: (index: number, messageId: string, content: string, isLike: boolean) => void;
  handleLanguageChange: (code: string) => void;
  toggleChat: () => void;
  search: {
    isSearching: boolean;
    results: Message[];
    query: string;
  };
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
  sendMessage
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-24 right-6 z-50 flex flex-col w-80 max-h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
        open
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      {/* Header */}
      <ChatHeader 
        botAvatarState={botAvatarState}
        language={language}
        languages={languages}
        onLanguageChange={handleLanguageChange}
        onClose={toggleChat}
        onClearHistory={clearHistory}
      />

      {/* Search bar */}
      <SearchBar 
        query={search.query} 
        isSearching={search.isSearching}
        resultCount={search.results.length}
        onSearch={handleSearch}
        onClearSearch={clearSearch}
      />

      {/* Messages */}
      <ChatMessages 
        messages={messages}
        loading={loading}
        handleFeedback={handleFeedback}
        messagesEndRef={messagesEndRef}
        search={search}
      />

      {/* Input */}
      <ChatInputBox loading={loading} onSendMessage={sendMessage} />
    </div>
  );
};
