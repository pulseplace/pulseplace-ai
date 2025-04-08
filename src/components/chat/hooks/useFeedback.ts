
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '../types';
import { logFeedback } from '../services';

export const useFeedback = (sessionId: string) => {
  const { toast } = useToast();
  const [voteStatus, setVoteStatus] = useState<Record<string, 'up' | 'down' | null>>({});
  
  const handleFeedback = async (messageId: string, message: Message, feedback: 'up' | 'down') => {
    // Record the vote locally
    setVoteStatus(prev => ({
      ...prev,
      [messageId]: feedback
    }));
    
    // Show toast based on feedback
    if (feedback === 'up') {
      toast({
        description: "Thanks for your positive feedback!",
      });
    } else {
      toast({
        description: "We'll work to improve our responses. Thanks for the feedback.",
      });
    }
    
    try {
      // Log the feedback to the server
      await logFeedback(sessionId, messageId, feedback, message.content);
    } catch (error) {
      console.error('Error logging feedback:', error);
    }
  };
  
  return { voteStatus, handleFeedback };
};
