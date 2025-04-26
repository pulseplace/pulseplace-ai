
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
        content: "Hi! I'm PulseBot, your AI assistant for workplace culture improvement. I can help you understand your culture metrics, certification progress, and suggest ways to enhance your workplace environment. What would you like to know?",
        avatarState: 'happy'
      };
    }
    
    if (message.toLowerCase().includes('help')) {
      return {
        content: "I can help with analyzing workplace culture metrics, tracking PulseScore certification progress, understanding survey feedback, and providing actionable recommendations for improvement. What specific area would you like to focus on?",
        avatarState: 'excited'
      };
    }
    
    if (message.toLowerCase().includes('culture') || message.toLowerCase().includes('survey')) {
      return {
        content: "PulsePlace helps measure and improve workplace culture through AI-powered surveys and analytics. Our approach focuses on trust as a foundational element of healthy workplace environments. Would you like to see your latest culture metrics or get recommendations for improvement?",
        avatarState: 'neutral'
      };
    }
    
    // Default response
    return {
      content: "I'm here to help improve your workplace culture. I can assist with understanding culture metrics, certification progress, or provide recommendations for creating a more engaging work environment. What would you like to explore?",
      avatarState: 'neutral'
    };
  }
};
