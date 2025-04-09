
import React, { RefObject, useEffect } from 'react';
import { Message, BotAvatarState } from '../types';
import { HighlightedMessage } from './HighlightedMessage';
import { TypingIndicator } from './TypingIndicator';
import { BotEmoji } from '../BotEmoji';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
  handleFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  isSearching: boolean;
  searchResults: string[];
  botAvatarState: BotAvatarState;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loading,
  messagesEndRef,
  handleFeedback,
  isSearching,
  searchResults,
  botAvatarState
}) => {
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Get the current bot state for animation
  const botState = typeof botAvatarState === 'string' 
    ? botAvatarState 
    : botAvatarState?.status || 'idle';

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => {
        const isBot = message.role === 'bot' || message.role === 'assistant';
        // BotAvatarState can be a string or an object with avatar property
        const avatarUrl = typeof botAvatarState === 'string' ? undefined : botAvatarState.avatar;

        return (
          <div key={message.id} className="mb-4">
            <div className={`flex ${isBot ? 'items-start' : 'flex-row-reverse items-start'}`}>
              {isBot && (
                <div className="flex-shrink-0 mr-2">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Bot Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <BotEmoji state="happy" size="sm" />
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-col max-w-[80%]">
                <div className={`px-4 py-2 rounded-lg ${
                  isBot 
                    ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
                    : 'bg-pulse-500 text-white rounded-tr-none'
                }`}>
                  {isSearching && searchResults.length > 0 ? (
                    <HighlightedMessage
                      content={message.content}
                      searchQuery={searchResults.join('|')}
                    />
                  ) : (
                    message.content
                  )}
                </div>
                {isBot && (
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <button
                      onClick={() => handleFeedback(message.id, 'positive')}
                      className="mr-2 text-gray-500 hover:text-green-600 focus:outline-none"
                      aria-label="Helpful"
                    >
                      <svg
                        className={`h-4 w-4 ${message.liked ? 'fill-green-600' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, 'negative')}
                      className="text-gray-500 hover:text-red-600 focus:outline-none"
                      aria-label="Not helpful"
                    >
                      <svg
                        className={`h-4 w-4 ${message.disliked ? 'fill-red-600' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3.707 9.293l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Improved typing indicator */}
      {loading && (
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <BotEmoji state="typing" size="sm" />
            </div>
          </div>
          <TypingIndicator isVisible={true} />
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
