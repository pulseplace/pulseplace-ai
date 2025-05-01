
// Mock API for PulseBot responses, would connect to a real API in production
import { BotAvatarStateValue } from '../types';

interface PulseBotResponse {
  content: string;
  avatarState?: BotAvatarStateValue;
  feedback?: {
    positive: number;
    negative: number;
  };
}

export const pulseBotAPI = {
  getResponse: async (message: string, language: string): Promise<PulseBotResponse> => {
    console.log(`Getting response for message: ${message} in language: ${language}`);
    
    // This would be replaced with an actual API call
    // Simulating API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample responses based on keywords
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      return {
        content: "Hello! I'm PulseBot, your AI assistant for workplace culture. How can I help you today?",
        avatarState: 'happy'
      };
    }
    
    if (message.toLowerCase().includes('help')) {
      return {
        content: "I can help with questions about workplace culture, PulseScore certification, and using the PulsePlace platform. What specific topic are you interested in?",
        avatarState: 'excited'
      };
    }
    
    if (message.toLowerCase().includes('culture') || message.toLowerCase().includes('survey')) {
      return {
        content: "PulsePlace helps measure and improve workplace culture through AI-powered surveys and analytics. Our approach focuses on trust as a foundational element of healthy workplace environments.",
        avatarState: 'neutral'
      };
    }
    
    // Default response
    return {
      content: "Thank you for your message. I'm here to help with any questions about workplace culture and PulseScore certification. Would you like to know more about a specific topic?",
      avatarState: 'neutral'
    };
  }
};
