
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Message, BotAvatarState } from '../types';
import { logFeedback } from '../services';

export const useFeedback = (
  messages: Message[], 
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  sessionId: string
) => {
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarState>('idle');

  const handleFeedback = (index: number, messageId: string, content: string, isLike: boolean) => {
    // Update UI state
    setMessages(prev => 
      prev.map((msg, i) => {
        if (i === index) {
          // If already liked/disliked, toggle off
          if (isLike && msg.liked) {
            return { ...msg, liked: false, disliked: false };
          }
          if (!isLike && msg.disliked) {
            return { ...msg, liked: false, disliked: false };
          }
          // Otherwise set new state
          return {
            ...msg,
            liked: isLike,
            disliked: !isLike
          };
        }
        return msg;
      })
    );
    
    // Log feedback to Supabase
    const feedbackType = isLike ? 'up' : 'down';
    logFeedback(messageId, content, feedbackType, sessionId);
    
    // Show thank you state briefly
    setBotAvatarState('happy');
    setTimeout(() => setBotAvatarState('idle'), 2000);
    
    toast({
      description: `Thank you for your feedback!`,
      duration: 2000,
    });
  };

  return {
    botAvatarState,
    setBotAvatarState,
    handleFeedback
  };
};
