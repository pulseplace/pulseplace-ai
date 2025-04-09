
import { useState, useCallback } from 'react';
import { Message, BotAvatarStateValue } from '../types';
import { useToast } from '@/hooks/use-toast';

export interface UseMessageSenderProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, 'timestamp'>) => Message;
  updateLastMessage: (content: string) => void;
}

export const useMessageSender = ({
  messages,
  addMessage,
}: UseMessageSenderProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    // Reset input
    setInputValue('');
    
    // Add user message
    addMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
    });
    
    // Set loading state
    setIsLoading(true);
    
    // Add initial bot message with typing indicator
    const botMessageId = crypto.randomUUID();
    const initialBotMessage = addMessage({
      id: botMessageId,
      role: 'assistant',
      content: '...',
      avatarState: 'typing',
    });
    
    try {
      // In a real implementation, we would send the message to an API
      // and stream the response back
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock response
      const responseText = generateMockResponse(content);
      const avatarState = determineBotAvatarState(content, responseText);
      
      // Update the bot message with the response
      addMessage({
        id: botMessageId,
        role: 'assistant',
        content: responseText,
        avatarState,
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I'm sorry, but I'm having trouble processing your request right now. Please try again later.",
        avatarState: 'confused',
      });
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, isLoading, toast]);

  // Mock response generation logic
  const generateMockResponse = (userMessage: string): string => {
    // Simple mock logic - in a real app, this would be an API call
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! How can I help you with PulsePlace today?";
    } else if (message.includes('pulsebot')) {
      return "PulseBot is our AI assistant that helps users navigate PulsePlace and provides insights on employee engagement and wellbeing.";
    } else if (message.includes('certification')) {
      return "Our certification process validates your organization's commitment to employee wellbeing through our comprehensive assessment methodology.";
    } else {
      return "That's an interesting question about workplace culture. At PulsePlace, we focus on helping organizations build healthier, more engaged workplaces through data-driven insights. Would you like to learn more about any specific aspect of our platform?";
    }
  };

  // Determine bot avatar state based on the conversation
  const determineBotAvatarState = (userMessage: string, botResponse: string): BotAvatarStateValue => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('thank') || message.includes('appreciate')) {
      return 'happy';
    } else if (message.includes('confused') || message.includes('don\'t understand')) {
      return 'thinking';
    } else if (message.includes('error') || message.includes('not working')) {
      return 'confused';
    } else {
      return 'neutral';
    }
  };

  return {
    isLoading,
    inputValue,
    setInputValue,
    sendMessage,
  };
};
