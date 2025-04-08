
import React from 'react';
import { BotAvatarState } from './types';

interface BotEmojiProps {
  state: BotAvatarState;
  size?: 'sm' | 'md' | 'lg';
}

export const BotEmoji: React.FC<BotEmojiProps> = ({ state, size = 'md' }) => {
  // Map the state to emoji
  const getEmoji = () => {
    switch (state) {
      case 'idle':
        return '😀'; // Idle
      case 'thinking':
        return '🤔'; // Thinking
      case 'typing':
        return '✨'; // Typing
      case 'happy':
        return '😊'; // Thanking
      default:
        return '🤖'; // Default
    }
  };
  
  // Size classes
  const sizeClass = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];
  
  return (
    <div className={`flex items-center justify-center ${sizeClass} transition-all duration-300`}>
      {getEmoji()}
    </div>
  );
};
