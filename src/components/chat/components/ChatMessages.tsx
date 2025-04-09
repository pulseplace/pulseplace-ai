import React, { RefObject } from 'react';
import { Message, BotAvatarState } from '../types';
import { HighlightedMessage } from './HighlightedMessage';

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

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => {
        const isBot = message.sender === 'bot';
        const avatar = isBot ? botAvatarState.avatar : undefined;

        return (
          <div key={message.id} className="mb-4">
            <div className={`flex items-start ${isBot ? 'items-start' : 'flex-row-reverse items-start'}`}>
              {avatar && (
                <img
                  src={avatar}
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div className="flex flex-col">
                <div className={`px-4 py-2 rounded-lg ${isBot ? 'bg-gray-100 text-gray-800' : 'bg-pulse-500 text-white'}`}>
                  {isSearching && searchResults.length > 0 ? (
                    <HighlightedMessage
                      message={message.content}
                      searchResults={searchResults}
                    />
                  ) : (
                    message.content
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => handleFeedback(message.id, 'positive')}
                    className="mr-2 text-gray-500 hover:text-green-600 focus:outline-none"
                  >
                    <svg
                      className={`h-5 w-5 ${message.liked ? 'fill-green-600' : ''}`}
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
                  >
                    <svg
                      className={`h-5 w-5 ${message.disliked ? 'fill-red-600' : ''}`}
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
              </div>
            </div>
          </div>
        );
      })}
      {loading && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
