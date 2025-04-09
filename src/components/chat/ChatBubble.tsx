
import React from 'react';
import { Message } from './types';
import { ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BotEmoji } from './BotEmoji';

interface ChatBubbleProps {
  message: Message;
  onFeedback?: (feedback: 'up' | 'down') => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onFeedback }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;
  
  return (
    <div className="flex items-start mb-4 relative">
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            isError ? "bg-yellow-500" : "bg-pulse-600"
          )}>
            {isError ? (
              <AlertCircle className="w-4 h-4 text-white" />
            ) : (
              <BotEmoji state="idle" size="sm" />
            )}
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "p-3 rounded-xl max-w-[80%] shadow-sm",
          isUser 
            ? "bg-pulse-600 text-white ml-auto" 
            : isError
              ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
              : "bg-gray-100 text-gray-800"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        
        {!isUser && !isError && onFeedback && (
          <div className="flex items-center justify-end mt-2 space-x-2">
            <button 
              onClick={() => onFeedback('up')}
              className={cn(
                "p-1 rounded-full transition-colors", 
                message.liked ? "bg-green-100 text-green-600" : "hover:bg-gray-200 text-gray-400"
              )}
              aria-label="Helpful"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button 
              onClick={() => onFeedback('down')}
              className={cn(
                "p-1 rounded-full transition-colors", 
                message.disliked ? "bg-red-100 text-red-600" : "hover:bg-gray-200 text-gray-400"
              )}
              aria-label="Not helpful"
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs">You</span>
          </div>
        </div>
      )}
    </div>
  );
};
