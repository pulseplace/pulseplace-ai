
import React from 'react';
import { Loader } from 'lucide-react';
import { ChatBubble } from '../ChatBubble';
import { Message, BotAvatarState } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  botAvatarState: BotAvatarState;
  handleFeedback: (messageId: string, message: Message, feedback: 'up' | 'down') => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isSearching: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loading,
  botAvatarState,
  handleFeedback,
  messagesEndRef,
  isSearching
}) => {
  return (
    <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-[300px]">
      {isSearching && messages.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No messages found
        </div>
      )}
      
      {messages.map((msg) => (
        <ChatBubble 
          key={msg.id} 
          message={msg} 
          onFeedback={(feedback) => handleFeedback(msg.id, msg, feedback)}
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
