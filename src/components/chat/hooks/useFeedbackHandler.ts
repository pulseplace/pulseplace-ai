
import { useCallback } from 'react';
import { Message } from '../types';
import { logFeedback } from '../services';

export const useFeedbackHandler = (messages: Message[], setMessages: (messages: Message[]) => void, sessionId: string) => {
  // Handle feedback
  const handleFeedback = useCallback(
    async (messageId: string, message: Message, feedback: 'up' | 'down') => {
      // Optimistically update the UI
      setMessages(
        messages.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              liked: feedback === 'up',
              disliked: feedback === 'down',
            };
          }
          return m;
        })
      );
      
      // Log the feedback
      await logFeedback(messageId, message.content, feedback, sessionId);
    },
    [messages, setMessages, sessionId]
  );

  return handleFeedback;
};
