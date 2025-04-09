
import React from 'react';
import { Message } from './types';
import { BotEmoji } from './BotEmoji';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface ChatBubbleProps {
  message: Message;
  handleFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  searchQuery?: string;
  children?: React.ReactNode; // Add children prop
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  handleFeedback,
  searchQuery = '',
  children
}) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[85%]`}>
        {!isUser && <BotEmoji state="idle" />}

        <div 
          className={`p-3 rounded-lg ${
            isUser 
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {/* Render the provided children */}
          {children}
          
          {/* Feedback buttons for bot messages only */}
          {!isUser && (
            <div className="flex justify-end mt-2 gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                onClick={() => handleFeedback(message.id, 'positive')}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                onClick={() => handleFeedback(message.id, 'negative')}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
