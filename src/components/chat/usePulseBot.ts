import { useState, useRef, useEffect } from 'react';
import { Message, MessageLanguage, BotAvatarStateValue, SessionInfo } from './types';
import { useToast } from '@/hooks/use-toast';

export const usePulseBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('neutral');
  const [language, setLanguage] = useState<MessageLanguage>('en');
  const [search, setSearch] = useState('');
  const [confetti, setConfetti] = useState({ isActive: false, config: {} });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Session info
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>({
    startTime: new Date(),
    language: 'en',
    messageCount: 0,
    userMessageCount: 0,
    botMessageCount: 0,
  });
  
  useEffect(() => {
    // Add welcome message when the component mounts
    const welcomeMessage: Message = {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi there! I\'m PulseBot, your AI assistant for workplace culture. How can I help you today?',
      timestamp: new Date(),
      language: 'en',
    };
    
    setMessages([welcomeMessage]);
    
    // Update session info
    setSessionInfo(prev => ({
      ...prev,
      botMessageCount: prev.botMessageCount + 1,
      messageCount: prev.messageCount + 1
    }));
  }, []);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setOpen(!open);
  };
  
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date(),
      language,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setBotAvatarState('thinking');
    
    // Update session info
    setSessionInfo(prev => ({
      ...prev,
      userMessageCount: prev.userMessageCount + 1,
      messageCount: prev.messageCount + 1
    }));
    
    // Simulate API call
    setTimeout(() => {
      // Simulate bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: generateBotResponse(text),
        timestamp: new Date(),
        language,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
      setBotAvatarState('neutral');
      
      // Update session info
      setSessionInfo(prev => ({
        ...prev,
        botMessageCount: prev.botMessageCount + 1,
        messageCount: prev.messageCount + 1
      }));
      
      // Show confetti occasionally
      if (Math.random() > 0.8) {
        setConfetti({ 
          isActive: true, 
          config: {
            angle: 90,
            spread: 360,
            startVelocity: 40,
            elementCount: 70,
            dragFriction: 0.12,
            duration: 3000,
            stagger: 3,
            width: "10px",
            height: "10px",
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
          }
        });
        setTimeout(() => setConfetti({ isActive: false, config: {} }), 3000);
      }
    }, 1500);
  };
  
  const handleFeedback = (messageId: string, value: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { 
              ...message, 
              liked: value === 'positive' ? true : message.liked,
              disliked: value === 'negative' ? true : message.disliked
            }
          : message
      )
    );
    
    toast({
      title: value === 'positive' ? "Thanks for the positive feedback!" : "Thanks for your feedback",
      description: value === 'positive' 
        ? "We're glad this response was helpful." 
        : "We'll use this to improve future responses.",
    });
  };
  
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
    
    setSessionInfo(prev => ({
      ...prev,
      language: newLanguage
    }));
    
    toast({
      title: "Language Changed",
      description: `PulseBot will now respond in ${getLanguageName(newLanguage)}.`,
    });
  };
  
  const handleSearch = (query: string) => {
    setSearch(query);
    
    // Implement search logic here
    if (query.trim()) {
      toast({
        title: "Searching Messages",
        description: `Searching for "${query}"...`,
      });
    }
  };
  
  const clearSearch = () => {
    setSearch('');
  };
  
  const clearHistory = () => {
    // Keep only the welcome message
    const welcomeMessage = messages[0];
    setMessages([welcomeMessage]);
    
    // Reset session info except start time
    setSessionInfo({
      startTime: sessionInfo.startTime,
      language,
      messageCount: 1,
      userMessageCount: 0,
      botMessageCount: 1
    });
    
    toast({
      title: "Chat History Cleared",
      description: "Your conversation history has been cleared.",
    });
  };
  
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
};

// Helper functions
function generateBotResponse(userMessage: string): string {
  const responses = [
    "I understand you're asking about workplace culture. Our PulsePlace platform can help measure and improve trust in your organization.",
    "That's a great question about employee engagement. Our AI-powered analytics can provide insights based on real-time feedback.",
    "PulsePlace certification is based on verified employee feedback data, not just testimonials. It's a powerful tool for employer branding.",
    "Our pulse surveys are designed to measure trust without causing survey fatigue. They're quick, engaging, and provide valuable insights.",
    "Would you like to know more about how our dashboard works? It provides real-time metrics on your workplace culture.",
    "The PulseScore™ is our proprietary metric that quantifies workplace trust based on multiple factors.",
    "I'd be happy to explain how our certification process works. It involves data collection, analysis, and verification.",
    "Many organizations see significant improvements in retention and productivity after implementing PulsePlace."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function getLanguageName(code: MessageLanguage): string {
  const languages: Record<MessageLanguage, string> = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'other': 'Other'
  };
  
  return languages[code] || 'Unknown';
}
