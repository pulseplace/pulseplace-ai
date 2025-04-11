
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message } from './types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BotEmoji } from './BotEmoji';

interface ChatBubbleProps {
  message: Message;
  children: React.ReactNode;
  handleFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  searchQuery?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  children,
  handleFeedback,
  searchQuery = '',
}) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  // Don't render system messages
  if (isSystem) {
    return null;
  }
  
  // Format timestamp
  const formattedTime = message.timestamp instanceof Date
    ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Handle highlighting search results if there's a search query
  const highlightText = (text: string) => {
    if (!searchQuery || !text) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
  };

  return (
    <div 
      className={cn(
        "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "flex flex-col max-w-[80%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Message bubble */}
        <div className="flex items-start gap-2">
          {/* Bot avatar for assistant messages */}
          {!isUser && (
            <div className="mt-0.5 h-8 w-8 rounded-full bg-pulse-gradient flex items-center justify-center flex-shrink-0">
              <BotEmoji state={message.avatarState || 'neutral'} size="sm" />
            </div>
          )}
          
          {/* Message content */}
          <div 
            className={cn(
              "py-2 px-3 rounded-lg",
              isUser 
                ? "bg-pulse-600 text-white rounded-tr-none" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
            )}
          >
            {children}
          </div>
        </div>
        
        {/* Timestamp and feedback controls */}
        <div className={cn(
          "flex items-center mt-1 text-xs text-gray-500",
          isUser ? "justify-end" : "justify-start"
        )}>
          <span className="text-[10px]">{formattedTime}</span>
          
          {/* Show feedback buttons only for assistant messages */}
          {!isUser && (
            <div className="flex items-center ml-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "p-0 h-5 w-5 rounded-full",
                  message.liked ? "text-green-500" : "text-gray-400 hover:text-gray-600"
                )}
                onClick={() => handleFeedback(message.id, 'positive')}
                disabled={message.liked || message.disliked}
              >
                <ThumbsUp className="h-3 w-3" />
                <span className="sr-only">Like</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "p-0 h-5 w-5 rounded-full ml-1",
                  message.disliked ? "text-red-500" : "text-gray-400 hover:text-gray-600"
                )}
                onClick={() => handleFeedback(message.id, 'negative')}
                disabled={message.liked || message.disliked}
              >
                <ThumbsDown className="h-3 w-3" />
                <span className="sr-only">Dislike</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
