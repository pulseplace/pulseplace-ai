
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/contexts/ChatbotContext';
import { Bot, User } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        'flex w-full mb-4 items-start',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-pulse-600 flex items-center justify-center text-white shadow-md">
            <Bot className="h-4 w-4" />
          </div>
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
          isUser
            ? 'bg-pulse-600 text-white'
            : 'bg-gray-100 text-gray-800'
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 shadow-md">
            <User className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
