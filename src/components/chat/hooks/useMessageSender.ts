
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { Message, BotAvatarState, SessionInfo } from '../types';
import { callPulseBotAPI, logInteraction } from '../services';

export const useMessageSender = (
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setLoading: (loading: boolean) => void,
  setBotAvatarState: (state: BotAvatarState) => void,
  scrollToBottom: () => void,
  language: string,
  sessionInfo: SessionInfo,
  triggerConfetti: () => void
) => {
  // Send message handler
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const id = `msg_${Date.now()}`;
      const newMessage = { id, role: 'user' as const, content };
      
      // Add user message to the list
      setMessages([...messages, newMessage]);
      
      // Start loading and scroll to bottom
      setLoading(true);
      scrollToBottom();
      
      // Set bot to thinking state
      setBotAvatarState('thinking');
      
      // Add a short delay to show the thinking state
      await new Promise(resolve => setTimeout(resolve, 600));
      
      try {
        // Set to typing state before API call
        setBotAvatarState('typing');
        
        // Call the API with timeout protection
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 15000); // 15 second timeout
        
        try {
          const botReply = await callPulseBotAPI([...messages, newMessage], language, sessionInfo, abortController.signal);
          clearTimeout(timeoutId);
          
          if (botReply) {
            // Generate a unique ID for the bot message
            const botMessageId = `bot_${Date.now()}`;
            
            // Create the new bot message
            const newBotMessage = {
              id: botMessageId,
              role: 'bot' as const,
              content: botReply,
            };
            
            // Add the bot message to the list
            setMessages([...messages, newMessage, newBotMessage]);
            
            // Log the interaction
            logInteraction(
              sessionInfo.id,
              content,
              botReply,
              language,
              'happy' // Set to 'happy' after successful response
            ).catch(err => console.error("Failed to log interaction:", err));
            
            // Trigger confetti effect (25% chance)
            if (Math.random() > 0.75) {
              triggerConfetti();
            }
            
            // Set bot avatar to happy
            setBotAvatarState('happy');
            
            // Reset to idle state after 3 seconds
            setTimeout(() => {
              setBotAvatarState('idle');
            }, 3000);
          } else {
            // Handle empty response
            handleBotError("I apologize, but I couldn't generate a helpful response. Could you try rephrasing your question?", newMessage);
          }
        } catch (err) {
          clearTimeout(timeoutId);
          if (err.name === 'AbortError') {
            handleBotError("I'm sorry, but your request timed out. Please try again with a shorter question.", newMessage);
          } else {
            throw err; // Re-throw for the outer catch block
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        
        // Determine appropriate error message based on error type
        let errorMessage = "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
        
        if (error.message?.includes('rate limit')) {
          errorMessage = "I'm currently handling many requests. Please try again in a few moments.";
        } else if (error.message?.includes('timeout')) {
          errorMessage = "Your question is taking longer than expected to process. Could you try a simpler question?";
        } else if (error.message?.includes('content filter')) {
          errorMessage = "I'm not able to respond to that type of question. Please try a different topic.";
        }
        
        handleBotError(errorMessage, newMessage);
        
        toast({
          title: "Communication Error",
          description: "Failed to get a response. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    },
    [messages, language, sessionInfo, scrollToBottom, setLoading, setMessages, setBotAvatarState, triggerConfetti]
  );
  
  // Helper function to handle bot errors with fallback messages
  const handleBotError = (errorMessage: string, userMessage: Message) => {
    const botErrorMessageId = `bot_error_${Date.now()}`;
    
    // Create the error message from bot
    const botErrorMessage = {
      id: botErrorMessageId,
      role: 'bot' as const,
      content: errorMessage,
      isError: true, // Flag to style error messages differently
    };
    
    // Add the error message to the list
    setMessages([...messages, userMessage, botErrorMessage]);
    
    // Set bot avatar back to idle
    setBotAvatarState('idle');
  };

  return { sendMessage };
};
