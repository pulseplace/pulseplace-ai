
import React from 'react';
import { Loader } from 'lucide-react';
import { ChatBubble } from '../ChatBubble';
import { Message } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  handleFeedback: (index: number, messageId: string, content: string, isLike: boolean) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  search: {
    isSearching: boolean;
    results: Message[];
    query: string;
  };
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loading,
  handleFeedback,
  messagesEndRef,
  search
}) => {
  // Determine which messages to display: search results or all messages
  const displayMessages = search.isSearching ? search.results : messages;

  return (
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
  );
};
