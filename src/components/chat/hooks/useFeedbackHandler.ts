
import { useCallback } from 'react';
import { Message } from '../types';
import { logFeedback } from '../services/api-service';

export const useFeedbackHandler = (messages: Message[], setMessages: (messages: Message[]) => void, sessionId: string) => {
  // Handle feedback
  const handleFeedback = useCallback(
    async (index: number, messageId: string, content: string, isLike: boolean) => {
      const message = messages.find((m) => m.id === messageId);
      
      if (!message) return;
      
      // Optimistically update the UI
      setMessages(
        messages.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              liked: isLike,
              disliked: !isLike,
            };
          }
          return m;
        })
      );
      
      // Log the feedback with the correct feedback type
      const feedbackType = isLike ? 'up' : 'down';
      await logFeedback(messageId, content, feedbackType, sessionId);
    },
    [messages, setMessages, sessionId]
  );

  return { handleFeedback };
};
