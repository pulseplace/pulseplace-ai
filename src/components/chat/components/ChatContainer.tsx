
import React, { useEffect } from 'react';
import { Message, BotAvatarState, MessageLanguage, SearchState } from '../types';
import { cn } from '@/lib/utils';
import { ChatMessages } from './ChatMessages';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatHeader } from './ChatHeader';
import { ChatSearchBar } from './ChatSearchBar';
import { ChatFooter } from './ChatFooter';
import { ClearHistoryDialog } from './ClearHistoryDialog';

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
  search: SearchState;
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
        <ChatHeader
          botAvatarState={botAvatarState}
          language={language}
          languages={languages}
          handleLanguageChange={handleLanguageChange}
          toggleChat={toggleChat}
          onClearHistory={() => setClearConfirmOpen(true)}
        />

        {/* Search bar */}
        <ChatSearchBar 
          search={search}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          <ChatMessages
            messages={search.isSearching ? search.results : messages}
            loading={loading}
            botAvatarState={botAvatarState}
            handleFeedback={handleFeedback}
            messagesEndRef={messagesEndRef}
            isSearching={search.isSearching}
            searchQuery={search.query}
          />
        </div>

        {/* Footer with input */}
        <ChatFooter
          onSendMessage={sendMessage}
          loading={loading}
          onClearHistory={() => setClearConfirmOpen(true)}
        />
      </div>
      
      {/* Clear history confirmation dialog */}
      <ClearHistoryDialog
        open={clearConfirmOpen}
        onOpenChange={setClearConfirmOpen}
        onConfirm={handleClearConfirm}
      />
    </>
  );
};
