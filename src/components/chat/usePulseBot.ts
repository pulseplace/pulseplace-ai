import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { BotAvatarState, Message, SessionInfo, ConfettiState } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useConfetti } from './hooks/useConfetti';
import { useSearchParams } from 'react-router-dom';
import { callPulseBotAPI, logFeedback, logInteraction } from './services/api-service';

// Define the available languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
];

// Session info from local storage
const getSessionInfo = (): SessionInfo => {
  const storedSession = localStorage.getItem('pulsebot_session');
  if (storedSession) {
    return JSON.parse(storedSession);
  } else {
    const newSession: SessionInfo = {
      id: uuidv4(),
      createdAt: new Date(),
    };
    localStorage.setItem('pulsebot_session', JSON.stringify(newSession));
    return newSession;
  }
};

export function usePulseBot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarState>('idle');
  const [language, setLanguage] = useState(languages[0].code);
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState({
    query: '',
    isSearching: false,
    results: [] as Message[]
  });
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>(getSessionInfo());
  const { confetti, triggerConfetti } = useConfetti();

  // Function to scroll to the bottom of the messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Load initial welcome message and scroll to bottom
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome_msg',
      role: 'bot',
      content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
    };
    setMessages([welcomeMessage]);
    scrollToBottom();
  }, [scrollToBottom]);

  // Send message handler
  const sendMessage = useCallback(
    async (content: string) => {
      if (loading || !content.trim()) return;

      const id = `msg_${Date.now()}`;
      const newMessage = { id, role: 'user' as const, content };
      
      // Add user message to the list
      setMessages((prev) => [...prev, newMessage]);
      
      // Start loading and scroll to bottom
      setLoading(true);
      scrollToBottom();
      setBotAvatarState('thinking');

      try {
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
          setMessages((prev) => [...prev, newBotMessage]);
          
          // Log the interaction
          logInteraction(
            sessionInfo.id,
            content,
            botReply,
            language,
            'happy' // Set to 'happy' after successful response
          );
          
          // Trigger confetti effect (50% chance)
          if (Math.random() > 0.5) {
            triggerConfetti();
          }
          
          // Set bot avatar to happy
          setBotAvatarState('happy');
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
    [loading, messages, language, sessionInfo, scrollToBottom, triggerConfetti]
  );

  // Handle language change
  const handleLanguageChange = (code: string) => {
    setLanguage(code);
  };

  // Toggle chat handler
  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  // Clear history handler
  const clearHistory = () => {
    setMessages([]);
    const welcomeMessage: Message = {
      id: 'welcome_msg',
      role: 'bot',
      content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
    };
    setMessages([welcomeMessage]);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearch(prev => ({ ...prev, query, isSearching: true }));
    const results = messages.filter(msg =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
    setSearch(prev => ({ ...prev, results }));
  };

  // Clear search
  const clearSearch = () => {
    setSearch({ query: '', isSearching: false, results: [] });
  };

  // Handle feedback
  const handleFeedback = useCallback(
    async (messageId: string, feedbackType: 'up' | 'down') => {
      const message = messages.find((m) => m.id === messageId);
      
      if (!message) return;
      
      // Optimistically update the UI
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              liked: feedbackType === 'up',
              disliked: feedbackType === 'down',
            };
          }
          return m;
        })
      );
      
      // Log the feedback
      await logFeedback(messageId, message.content, feedbackType, sessionInfo.id);
    },
    [messages, sessionInfo.id]
  );

  return {
    open,
    loading,
    messages,
    botAvatarState,
    language,
    languages,
    messagesEndRef,
    sendMessage,
    handleFeedback,
    handleLanguageChange,
    toggleChat,
    clearHistory,
    search,
    handleSearch,
    clearSearch,
    confetti,
    sessionInfo
  };
}
