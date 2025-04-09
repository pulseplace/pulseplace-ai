
import React from 'react';
import { Message, BotAvatarState } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Markdown } from './Markdown';
import { TypingIndicator } from './TypingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  botAvatarState: BotAvatarState;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleFeedback: (messageId: string, value: 'positive' | 'negative') => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loading,
  botAvatarState,
  messagesEndRef,
  handleFeedback,
}) => {
  // Helper function to get avatar image based on message role
  const getAvatar = (role: string, state?: BotAvatarState) => {
    if (role === 'user') {
      return (
        <Avatar className="h-8 w-8 border border-gray-200">
          <AvatarFallback className="bg-gray-100 text-gray-500">U</AvatarFallback>
        </Avatar>
      );
    }
    
    let avatarSrc = '/assets/bot-avatar-idle.png';
    
    if (role === 'assistant' || role === 'bot') {
      if (typeof state === 'string') {
        avatarSrc = `/assets/bot-avatar-${state}.png`;
      } else if (state && typeof state === 'object') {
        avatarSrc = `/assets/bot-avatar-${state.status}.png`;
        if (state.avatar) {
          avatarSrc = state.avatar;
        }
      }
    }

    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarSrc} alt="PulseBot" />
        <AvatarFallback className="bg-pulse-100 text-pulse-600">PB</AvatarFallback>
      </Avatar>
    );
  };

  return (
    <div className="flex flex-col space-y-4 px-3 pt-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`flex max-w-[80%] ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            } items-start space-x-2 ${message.role === 'user' ? 'space-x-reverse' : ''}`}
          >
            {message.role !== 'user' && (
              <div className="flex-shrink-0 mt-1">{getAvatar(message.role, botAvatarState)}</div>
            )}
            <div
              className={`${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                  : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
              } px-4 py-2 shadow-sm`}
            >
              <Markdown content={message.content} />
              
              {message.role === 'assistant' && (
                <div className="flex items-center justify-end mt-2 space-x-2">
                  <button 
                    onClick={() => handleFeedback(message.id, 'positive')}
                    className={`p-1 rounded hover:bg-gray-200 transition-colors ${message.liked ? 'text-green-500' : 'text-gray-400'}`}
                    aria-label="Thumbs up"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleFeedback(message.id, 'negative')}
                    className={`p-1 rounded hover:bg-gray-200 transition-colors ${message.disliked ? 'text-red-500' : 'text-gray-400'}`}
                    aria-label="Thumbs down"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 mt-1">{getAvatar('user')}</div>
            )}
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 mt-1">
              {getAvatar('assistant', typeof botAvatarState === 'string' ? 'typing' : { status: 'typing' })}
            </div>
            <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
