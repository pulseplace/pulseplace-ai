
import React, { useEffect, useState } from 'react';
import { Message, BotAvatarState } from '../types';
import { ChatBubble } from '../ChatBubble';
import { BotEmoji } from '../BotEmoji';
import { TypingIndicator } from './TypingIndicator';
import Markdown from './Markdown';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  botAvatarState: BotAvatarState;
  isSearching?: boolean;
  searchResults?: any[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loading,
  messagesEndRef,
  handleFeedback,
  botAvatarState,
  isSearching = false,
  searchResults = [],
}) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);

  // Display all messages or search results based on search state
  useEffect(() => {
    if (isSearching && searchResults.length > 0) {
      setVisibleMessages(searchResults as Message[]);
    } else {
      setVisibleMessages(messages.filter(msg => msg.role !== 'system'));
    }
  }, [messages, isSearching, searchResults]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages, loading, messagesEndRef]);

  // Get bot avatar state
  const getBotEmoji = () => {
    if (typeof botAvatarState === 'string') {
      return botAvatarState;
    } else if (botAvatarState && 'status' in botAvatarState) {
      return botAvatarState.status;
    }
    return 'idle';
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {visibleMessages.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <BotEmoji state="wave" size={64} />
          <p className="mt-4 text-center max-w-md">
            Welcome to PulseBot! I'm here to help with questions about workplace culture, 
            PulseScore certification, and using our platform. How can I assist you today?
          </p>
        </div>
      ) : (
        visibleMessages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            handleFeedback={handleFeedback}
          >
            {message.content && (
              <Markdown content={message.content} />
            )}
          </ChatBubble>
        ))
      )}

      {loading && (
        <div className="flex items-start">
          <BotEmoji state={getBotEmoji()} className="mr-2 mt-1" />
          <TypingIndicator isVisible={true} />
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
