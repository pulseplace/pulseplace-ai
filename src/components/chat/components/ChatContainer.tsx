
import React, { RefObject } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatSearchBar } from './ChatSearchBar';
import { ChatFooter } from './ChatFooter';
import { BotAvatarState, MessageLanguage, Message, SearchState } from '../types';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Convert search results to string[] if needed
  const searchResultsAsStrings = search.results ? 
    search.results.map(result => typeof result === 'string' ? result : result.content) : 
    [];

  // Adjust positioning and sizing based on device type
  const mobilePositionClass = "fixed inset-0 z-50 m-0 max-w-full max-h-full rounded-none";
  const desktopPositionClass = "fixed bottom-24 right-6 z-50 flex flex-col w-80 sm:w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)] rounded-lg";

  // Use a different animation for mobile versus desktop
  const mobileAnimation = open
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";
  const desktopAnimation = open
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4 pointer-events-none";

  return (
    <div
      className={cn(
        'flex flex-col bg-white shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
        isMobile ? mobilePositionClass : desktopPositionClass,
        isMobile ? mobileAnimation : desktopAnimation
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
        isMobile={isMobile}
      />

      {/* Search Bar - Don't show on very small screens to save space */}
      {(!isMobile || window.innerWidth >= 360) && (
        <ChatSearchBar
          search={search}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
      )}

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
        placeholderText={isMobile ? "Type a message..." : "Ask me about workplace culture or PulseScore..."}
      />
    </div>
  );
};
