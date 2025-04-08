
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface ChatBubbleProps {
  message: Message;
  index: number;
  onFeedback: (index: number, messageId: string, content: string, isLike: boolean) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index, onFeedback }) => {
  const isBot = message.role === 'bot';
  const canProvideFeedback = isBot && index > 0 && !message.id.startsWith('lang_');
  
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          'p-3 rounded-lg max-w-[90%]',
          isBot 
            ? 'bg-gray-100 text-gray-800 mr-auto' 
            : 'bg-pulse-600 text-white ml-auto'
        )}
      >
        {message.content}
      </div>
      
      {/* Feedback buttons (thumbs up/down) for bot messages only */}
      {canProvideFeedback && (
        <div className="flex mt-1 space-x-2">
          <button 
            onClick={() => onFeedback(index, message.id, message.content, true)}
            className={cn(
              "p-1 rounded-full hover:bg-gray-200 transition-colors", 
              message.liked && "text-pulse-600"
            )}
            aria-label="Helpful"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={() => onFeedback(index, message.id, message.content, false)}
            className={cn(
              "p-1 rounded-full hover:bg-gray-200 transition-colors", 
              message.disliked && "text-gray-500"
            )}
            aria-label="Not helpful"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
