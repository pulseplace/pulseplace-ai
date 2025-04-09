
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '../types';
import { logFeedback } from '../services';

export const useFeedback = (sessionId: string) => {
  const { toast } = useToast();
  const [voteStatus, setVoteStatus] = useState<Record<string, 'up' | 'down' | null>>({});
  
  // Updated signature to match what's used in ChatContainer
  const handleFeedback = async (messageId: string, feedback: 'positive' | 'negative') => {
    // Convert the feedback format
    const feedbackType = feedback === 'positive' ? 'up' : 'down';
    
    // Record the vote locally
    setVoteStatus(prev => ({
      ...prev,
      [messageId]: feedbackType
    }));
    
    // Show toast based on feedback
    if (feedback === 'positive') {
      toast({
        description: "Thanks for your positive feedback!",
      });
    } else {
      toast({
        description: "We'll work to improve our responses. Thanks for the feedback.",
      });
    }
    
    try {
      // Find the message content
      // This is a placeholder since we don't have access to messages here
      const messageContent = "Message content"; // In real implementation, look up from messages
      
      // Log the feedback to the server
      await logFeedback(messageId, messageContent, feedbackType, sessionId);
    } catch (error) {
      console.error('Error logging feedback:', error);
    }
  };
  
  return { voteStatus, handleFeedback };
};
