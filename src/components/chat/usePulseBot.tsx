
import { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, BotAvatarState, MessageLanguage, ConfettiConfig } from './types';
import { pulseBotAPI } from './services/pulsebot-api';
import { logInteraction } from './services/interaction-service';
import { logFeedback } from './services/feedback-service';
import { toast } from 'sonner';

// Default confetti configuration
const defaultConfetti: ConfettiConfig = {
  particleCount: 50,
  spread: 70,
  origin: { y: 0.6 }
};

export function usePulseBot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm PulseBot, your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
      avatarState: 'happy'
    }
  ]);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarState>('idle');
  const [language, setLanguage] = useState<MessageLanguage>('en');
  const [search, setSearch] = useState('');
  const [confetti, setConfetti] = useState<{ isActive: boolean; config: ConfettiConfig }>({
    isActive: false,
    config: defaultConfetti
  });
  
  // Create a session ID when the component is first mounted
  const [sessionInfo] = useState(() => ({
    id: `session_${uuidv4().slice(0, 10)}`
  }));
  
  // Ref for scrolling to the bottom of the messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Log when session starts
  useEffect(() => {
    console.log('PulseBot session started:', sessionInfo.id);
  }, [sessionInfo.id]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Create a message object for the user's message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    // Add the user's message to the messages array
    setMessages(prev => [...prev, userMessage]);
    
    // Set loading to true
    setLoading(true);
    setBotAvatarState('thinking');
    
    try {
      // Get response from API
      const response = await pulseBotAPI.getResponse(content, language);
      
      // Create a message object for the bot's response
      const botMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        avatarState: response.avatarState || 'happy'
      };
      
      // Add the bot's response to the messages array
      setMessages(prev => [...prev, botMessage]);
      
      // Set the avatar state
      setBotAvatarState(response.avatarState || 'idle');
      
      // Log the interaction for analytics
      logInteraction(
        sessionInfo.id,
        content,
        response.content,
        language,
        response.avatarState || 'neutral'
      );
      
      // Trigger confetti for celebratory responses
      if (response.avatarState === 'excited' || response.avatarState === 'happy') {
        const shouldShowConfetti = Math.random() > 0.7; // 30% chance
        
        if (shouldShowConfetti) {
          setConfetti({
            isActive: true,
            config: {
              ...defaultConfetti,
              particleCount: response.avatarState === 'excited' ? 100 : 50
            }
          });
          
          // Turn off confetti after 2 seconds
          setTimeout(() => {
            setConfetti(prev => ({ ...prev, isActive: false }));
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Create an error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date().toISOString(),
        avatarState: 'confused'
      };
      
      // Add the error message to the messages array
      setMessages(prev => [...prev, errorMessage]);
      
      // Set the avatar state to confused
      setBotAvatarState('confused');
      
      // Show a toast notification
      toast.error('Error connecting to PulseBot. Please try again.');
    } finally {
      // Set loading to false
      setLoading(false);
    }
  }, [language, sessionInfo.id]);
  
  const handleFeedback = useCallback((messageId: string, value: 'positive' | 'negative') => {
    // Find the message
    const message = messages.find(msg => msg.id === messageId);
    
    if (!message) {
      console.error('Message not found:', messageId);
      return;
    }
    
    // Log feedback to service
    logFeedback(messageId, message.content, value === 'positive' ? 'up' : 'down', sessionInfo.id)
      .then(() => {
        // Update the messages with the feedback
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, feedback: value } 
              : msg
          )
        );
        
        // Show success toast
        toast.success(`Thank you for your ${value} feedback!`);
      })
      .catch(error => {
        console.error('Error logging feedback:', error);
        toast.error('Failed to log feedback. Please try again.');
      });
  }, [messages, sessionInfo.id]);
  
  const handleLanguageChange = useCallback((newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
    
    // Add a system message about the language change
    const systemMessage: Message = {
      id: uuidv4(),
      role: 'system',
      content: `Language changed to ${newLanguage}`,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, systemMessage]);
  }, []);
  
  const toggleChat = useCallback(() => {
    setOpen(prev => !prev);
  }, []);
  
  const handleSearch = useCallback((term: string) => {
    setSearch(term);
  }, []);
  
  const clearSearch = useCallback(() => {
    setSearch('');
  }, []);
  
  const clearHistory = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm PulseBot, your AI assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
        avatarState: 'happy'
      }
    ]);
    
    // Show success toast
    toast.success('Chat history cleared');
  }, []);

  return {
    open,
    loading,
    messages,
    botAvatarState,
    language,
    messagesEndRef,
    sendMessage,
    handleFeedback,
    handleLanguageChange,
    toggleChat,
    search,
    handleSearch,
    clearSearch,
    clearHistory,
    confetti,
    sessionInfo
  };
}
