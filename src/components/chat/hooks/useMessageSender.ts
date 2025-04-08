
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
        
        // Call the API
        const botReply = await callPulseBotAPI([...messages, newMessage], language, sessionInfo);
        
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
          );
          
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
          // Handle error
          toast({
            title: "Error",
            description: "Failed to get a response from the bot",
            variant: "destructive",
          });
          setBotAvatarState('idle');
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        setBotAvatarState('idle');
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    },
    [messages, language, sessionInfo, scrollToBottom, setLoading, setMessages, setBotAvatarState, triggerConfetti]
  );

  return { sendMessage };
};
