
import { useCallback } from 'react';
import { Message } from '../types';
import { logFeedback } from '../services';

export const useFeedbackHandler = (
  messages: Message[], 
  setMessages: (messages: Message[]) => void, 
  sessionId: string
) => {
  // Handle feedback with support for different parameter formats
  const handleFeedback = useCallback(
    async (messageId: string, messageOrFeedback: Message | 'positive' | 'negative', feedbackType?: 'up' | 'down') => {
      // Determine if we're using the new or old API format
      let message: Message;
      let feedback: 'up' | 'down';
      
      if (typeof messageOrFeedback === 'string') {
        // New format: (messageId, 'positive'|'negative')
        feedback = messageOrFeedback === 'positive' ? 'up' : 'down';
        // Find the message in our messages array
        const foundMessage = messages.find(m => m.id === messageId);
        if (!foundMessage) {
          console.error(`Message with ID ${messageId} not found`);
          return;
        }
        message = foundMessage;
      } else {
        // Old format: (messageId, message, feedback)
        message = messageOrFeedback;
        if (!feedbackType) {
          console.error('Feedback type is required when passing a message object');
          return;
        }
        feedback = feedbackType;
      }
      
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
