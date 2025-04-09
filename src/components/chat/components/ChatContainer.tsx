
import React, { RefObject } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatSearchBar } from './ChatSearchBar';
import { ChatFooter } from './ChatFooter';
import { BotAvatarState, MessageLanguage, Message, SearchState } from '../types';
import { cn } from '@/lib/utils';

interface ChatContainerProps {
  open: boolean;
  loading: boolean;
  messages: Message[];
  botAvatarState: BotAvatarState;
  language: MessageLanguage;
  languages: { value: MessageLanguage; label: string }[];
  messagesEndRef: RefObject<HTMLDivElement>;
  handleFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  handleLanguageChange: (language: MessageLanguage) => void;
  toggleChat: () => void;
  search: SearchState;
  handleSearch: (query: string) => void;
  clearSearch: () => void;
  clearHistory: () => void;
  sendMessage: (message: string) => void;
  onExportChat?: () => void;
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
  onExportChat
}) => {
  // Convert search results to string[] if needed
  const searchResultsAsStrings = search.results ? 
    search.results.map(result => typeof result === 'string' ? result : result.content) : 
    [];

  return (
    <div
      className={cn(
        'fixed bottom-24 right-6 z-50 flex flex-col w-80 sm:w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)] bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
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
        handleLanguageChange={handleLanguageChange}
        toggleChat={toggleChat}
        onClearHistory={clearHistory}
        onExportChat={onExportChat}
      />

      {/* Search Bar */}
      <ChatSearchBar
        search={search}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />

      {/* Messages */}
      <ChatMessages
        messages={messages}
        loading={loading}
        messagesEndRef={messagesEndRef}
        handleFeedback={handleFeedback}
        isSearching={search.isSearching}
        searchResults={searchResultsAsStrings}
        botAvatarState={botAvatarState}
      />

      {/* Footer */}
      <ChatFooter
        loading={loading}
        onSendMessage={sendMessage}
        placeholderText="Ask me about workplace culture or PulseScore..."
      />
    </div>
  );
};
