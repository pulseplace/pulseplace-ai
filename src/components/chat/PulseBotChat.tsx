
import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChatBubble } from './ChatBubble';
import { ChatInputBox } from './ChatInputBox';
import { ChatHeader } from './ChatHeader';
import { SearchBar } from './SearchBar';
import { usePulseBot } from './usePulseBot';

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
    clearHistory
  } = usePulseBot();

  // Determine which messages to display: search results or all messages
  const displayMessages = search.isSearching ? search.results : messages;

  return (
    <>
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
          
          {loading && (
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[90%] mr-auto">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-pulse-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-pulse-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-pulse-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInputBox loading={loading} onSendMessage={sendMessage} />
      </div>
    </>
  );
}
