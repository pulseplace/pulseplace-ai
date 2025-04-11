
import { useState, useCallback } from 'react';
import { BotAvatarStateValue, MessageLanguage } from '../types';
import { pulseBotAPI } from '../services/pulsebot-api';
import { logInteraction } from '../services/interaction-service';
import { toast } from 'sonner';

type MessageHandlers = {
  addUserMessage: (content: string, language?: MessageLanguage) => any;
  addBotMessage: (content: string, avatarState?: BotAvatarStateValue) => any;
  triggerConfetti: (config?: any) => void;
};

export function useBotCommunication(
  sessionId: string,
  messageHandlers: MessageHandlers,
) {
  const { addUserMessage, addBotMessage, triggerConfetti } = messageHandlers;
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('idle');

  const sendMessage = useCallback(async (text: string, language: MessageLanguage = 'en') => {
    if (!text.trim()) return;
    
    // Add user message
    addUserMessage(text, language);
    
    // Update bot state
    setLoading(true);
    setBotAvatarState('thinking');
    
    try {
      // Get response from API
      const response = await pulseBotAPI.getResponse(text, language);
      
      // Add the bot's response
      addBotMessage(response.content, response.avatarState || 'happy');
      
      // Set the avatar state
      setBotAvatarState(response.avatarState || 'idle');
      
      // Log the interaction for analytics
      logInteraction(
        sessionId,
        text,
        response.content,
        language,
        response.avatarState || 'neutral'
      );
      
      // Trigger confetti for celebratory responses
      if (response.avatarState === 'excited' || response.avatarState === 'happy') {
        const shouldShowConfetti = Math.random() > 0.7; // 30% chance
        
        if (shouldShowConfetti) {
          triggerConfetti({
            particleCount: response.avatarState === 'excited' ? 100 : 50,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      addBotMessage(
        "I'm sorry, I encountered an error while processing your request. Please try again.",
        'confused'
      );
      
      // Update bot state
      setBotAvatarState('confused');
      
      // Show toast
      toast.error('Error connecting to PulseBot. Please try again.');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  }, [sessionId, addUserMessage, addBotMessage, triggerConfetti]);

  return {
    loading,
    botAvatarState,
    setBotAvatarState,
    sendMessage
  };
}
