
import React from 'react';
import { ThumbsUp, ThumbsDown, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface ChatBubbleProps {
  message: Message;
  onFeedback: (feedback: 'up' | 'down') => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onFeedback }) => {
  const isBot = message.role === 'bot';
  
  return (
    <div
      className={cn(
        'flex w-full mb-4',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-pulse-600 flex items-center justify-center text-white">
            <Bot className="h-4 w-4" />
          </div>
        </div>
      )}
      
      <div className="flex flex-col max-w-[80%]">
        <div
          className={cn(
            'rounded-lg px-4 py-2',
            isBot ? 'bg-gray-100 text-gray-800' : 'bg-pulse-600 text-white'
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
        
        {/* Feedback buttons for bot messages only */}
        {isBot && (
          <div className="flex mt-1 space-x-2 justify-end">
            <button
              onClick={() => onFeedback('up')}
              className={cn(
                "p-1 rounded-full hover:bg-gray-200",
                message.liked && "bg-green-100 text-green-600"
              )}
              aria-label="Thumbs up"
            >
              <ThumbsUp className="h-3 w-3" />
            </button>
            <button
              onClick={() => onFeedback('down')}
              className={cn(
                "p-1 rounded-full hover:bg-gray-200",
                message.disliked && "bg-red-100 text-red-600"
              )}
              aria-label="Thumbs down"
            >
              <ThumbsDown className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            <User className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
};
