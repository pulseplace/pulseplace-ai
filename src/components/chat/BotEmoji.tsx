
import React, { useEffect, useState } from 'react';
import { BotAvatarState, BotAvatarStateValue } from './types';

interface BotEmojiProps {
  state: BotAvatarStateValue;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const BotEmoji: React.FC<BotEmojiProps> = ({ 
  state, 
  size = 'md',
  animated = true
}) => {
  const [displayState, setDisplayState] = useState<BotAvatarStateValue>(state);
  
  // Add animation effect when state changes
  useEffect(() => {
    if (animated && state !== displayState) {
      // Short delay to allow for transition animation
      const timer = setTimeout(() => {
        setDisplayState(state);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayState(state);
    }
  }, [state, displayState, animated]);
  
  // Map the state to emoji
  const getEmoji = () => {
    switch (displayState) {
      case 'idle':
        return '🤖'; // Idle/Default
      case 'thinking':
        return '🤔'; // Thinking
      case 'typing':
        return '⌨️'; // Typing
      case 'happy':
        return '😊'; // Happy/Thanking
      default:
        return '🤖'; // Default fallback
    }
  };
  
  // Size classes
  const sizeClass = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];
  
  return (
    <div 
      className={`flex items-center justify-center ${sizeClass} transition-all duration-300 ${
        animated ? 'transform hover:scale-110' : ''
      }`}
    >
      {getEmoji()}
    </div>
  );
};
