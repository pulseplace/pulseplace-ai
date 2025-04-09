
import React from 'react';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message } from './types';
import { BotEmoji } from './BotEmoji';
import { HighlightedMessage } from './components/HighlightedMessage';

interface ChatBubbleProps {
  message: Message;
  onFeedback?: (feedback: 'up' | 'down') => void;
  isHighlighted?: boolean;
  searchQuery?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  onFeedback,
  isHighlighted,
  searchQuery
}) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        'flex mb-3',
        isUser ? 'justify-end' : 'justify-start',
        isHighlighted && 'animate-pulse-once'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-pulse-600 flex items-center justify-center text-white shadow-sm">
            <BotEmoji state="happy" size="sm" />
          </div>
        </div>
      )}
      
      <div className="flex flex-col max-w-[80%]">
        <div
          className={cn(
            'px-4 py-2 rounded-2xl shadow-sm',
            isUser
              ? 'bg-pulse-600 text-white'
              : isHighlighted 
                ? 'bg-yellow-50 text-gray-800 border border-yellow-200' 
                : 'bg-gray-100 text-gray-800'
          )}
        >
          <HighlightedMessage content={message.content} searchQuery={searchQuery} />
          
          {/* FAQ blocks, automatically detected and styled */}
          {!isUser && message.content.includes('FAQ:') && (
            <div className="mt-2 p-2 bg-white rounded border border-gray-200">
              <h4 className="font-medium text-sm text-pulse-700">Frequently Asked Questions</h4>
              {/* Extract questions */}
              {message.content
                .split(/Q:|FAQ:/)
                .filter(part => part.trim().length > 0)
                .map((part, i) => (
                  <div key={i} className="mt-1.5 text-sm">
                    <strong className="text-gray-900">Q: {part.split('A:')[0].trim()}</strong>
                    {part.includes('A:') && (
                      <p className="text-gray-700 mt-0.5">
                        A: {part.split('A:')[1].trim()}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        
        {!isUser && onFeedback && (
          <div className="flex mt-1 space-x-2 self-end">
            <button
              onClick={() => onFeedback('up')}
              className="text-gray-400 hover:text-green-500 transition-colors text-xs flex items-center"
              aria-label="Helpful"
            >
              <ThumbsUp className="w-3.5 h-3.5 mr-1" />
              <span>Helpful</span>
            </button>
            <button
              onClick={() => onFeedback('down')}
              className="text-gray-400 hover:text-red-500 transition-colors text-xs flex items-center"
              aria-label="Not helpful"
            >
              <ThumbsDown className="w-3.5 h-3.5 mr-1" />
              <span>Not helpful</span>
            </button>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            <span className="text-xs font-medium">You</span>
          </div>
        </div>
      )}
    </div>
  );
};
