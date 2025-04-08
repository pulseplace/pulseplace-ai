
import React from 'react';
import { Sparkles, X, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChatBubble } from './ChatBubble';
import { ChatInputBox } from './ChatInputBox';
import { ChatHeader } from './ChatHeader';
import { SearchBar } from './SearchBar';
import { Confetti } from './Confetti';
import { usePulseBot } from './usePulseBot';
import { Skeleton } from '@/components/ui/skeleton';

export default function PulseBotChat() {
  const {
    open,
    loading,
    messages,
    botAvatarState,
    language,
    languages,
    messagesEndRef,
    sendMessage,
    handleFeedback,
    handleLanguageChange,
    toggleChat,
    search,
    handleSearch,
    clearSearch,
    clearHistory,
    confetti
  } = usePulseBot();

  // Determine which messages to display: search results or all messages
  const displayMessages = search.isSearching ? search.results : messages;

  return (
    <>
      {/* Confetti Animation */}
      <Confetti isActive={confetti.isActive} config={confetti.config} />
      
      {/* Floating chat button with tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleChat}
                className={cn(
                  'h-14 w-14 rounded-full shadow-lg transition-all duration-300',
                  open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
                )}
                aria-label={open ? "Close chat" : "Talk to PulseBot"}
              >
                {open ? (
                  <X className="h-6 w-6 text-white mx-auto" />
                ) : (
                  <Sparkles className="h-6 w-6 text-white mx-auto" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Talk to PulseBot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Chat dialog */}
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
        <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-[300px]">
          {search.isSearching && search.results.length === 0 && search.query && (
            <div className="text-center py-4 text-gray-500">
              No messages found matching "{search.query}"
            </div>
          )}
          
          {displayMessages.map((msg, i) => (
            <ChatBubble 
              key={msg.id} 
              message={msg} 
              index={i} 
              onFeedback={handleFeedback} 
            />
          ))}
          
          {/* Typing indicator animation */}
          {loading && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-pulse-600 flex items-center justify-center text-white">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInputBox loading={loading} onSendMessage={sendMessage} />
      </div>

      {/* Typing indicator styles */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #6366f1;
          margin-right: 4px;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .dot:nth-child(1) {
          animation-delay: 0ms;
        }
        .dot:nth-child(2) {
          animation-delay: 150ms;
        }
        .dot:nth-child(3) {
          animation-delay: 300ms;
        }
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: translateY(0);
          }
          40% { 
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
}
