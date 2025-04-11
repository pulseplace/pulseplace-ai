
import React from 'react';
import { Bot, SmilePlus, Frown, HelpCircle, Sparkles } from 'lucide-react';
import { BotAvatarStateValue } from './types';

interface BotEmojiProps {
  state: BotAvatarStateValue;
  size?: 'sm' | 'md' | 'lg';
}

export const BotEmoji: React.FC<BotEmojiProps> = ({ state, size = 'md' }) => {
  // Map size to actual dimensions
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  // Map state to emoji
  const getEmojiByState = () => {
    switch (state) {
      case 'happy':
        return <SmilePlus className={`${sizeMap[size]} text-white`} />;
      case 'confused':
        return <HelpCircle className={`${sizeMap[size]} text-white`} />;
      case 'sad':
        return <Frown className={`${sizeMap[size]} text-white`} />;
      case 'excited':
        return <Sparkles className={`${sizeMap[size]} text-white`} />;
      case 'thinking':
      case 'typing':
      case 'idle':
      case 'neutral':
      default:
        return <Bot className={`${sizeMap[size]} text-white`} />;
    }
  };

  return getEmojiByState();
};
