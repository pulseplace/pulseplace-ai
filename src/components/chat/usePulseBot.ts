import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Message, SessionInfo, BotAvatarState, SearchState } from './types';
import { pulseAssistantConfig } from '@/config/chatbot-config';

export const usePulseBot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionInfo] = useState<SessionInfo>(() => ({
    id: `session_${Math.random().toString(36).substring(2, 11)}`,
    createdAt: new Date()
  }));
  const [language, setLanguage] = useState(pulseAssistantConfig.defaultLanguage);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: `welcome_${Date.now()}`,
      role: 'bot', 
      content: "Hi, I'm PulseBot — your workplace guide! Ask me anything about surveys, PulseScore, or certification." 
    }
  ]);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarState>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Search state
  const [search, setSearch] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: []
  });
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Log feedback to Supabase
  const logFeedback = async (messageId: string, content: string, feedbackType: 'up' | 'down') => {
    try {
      const { data, error } = await supabase.functions.invoke('log-pulsebot-feedback', {
        body: { 
          message: content,
          feedbackType,
          userIdentifier: sessionInfo.id
        }
      });
      
      if (error) throw new Error(error.message || 'Failed to log feedback');
      console.log('Feedback logged successfully', data);
    } catch (err) {
      console.error('Error logging feedback:', err);
      // Silent fail - we don't want to bother the user if feedback logging fails
    }
  };

  const sendMessage = async (input: string) => {
    if (!input.trim() || loading) return;
    
    // Clear search if active
    if (search.isSearching) {
      setSearch({
        query: '',
        isSearching: false,
        results: []
      });
    }
    
    // Add user message
    const userMessageId = `user_${Date.now()}`;
    const userMessage = { 
      id: userMessageId,
      role: 'user' as const, 
      content: input.trim() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setBotAvatarState('typing');

    try {
      // Format messages for the API
      const apiMessages = messages
        .filter(m => m.role === 'bot' ? m.id !== 'welcome_msg' : true) // Filter out welcome message
        .map(m => ({ 
          role: m.role === 'bot' ? 'assistant' : 'user', 
          content: m.content 
        }))
        .concat({ role: 'user', content: userMessage.content });

      // Get system prompt based on selected language
      const systemPrompt = pulseAssistantConfig.systemPrompt[language] || pulseAssistantConfig.systemPrompt.en;

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
        body: { 
          messages: apiMessages,
          systemPrompt: systemPrompt,
          maxTokens: 500 
        },
      });

      if (error) throw new Error(error.message || 'Failed to get a response');

      // Add bot's response - ensuring role is typed correctly
      if (data && data.message) {
        const botMessageId = `bot_${Date.now()}`;
        setMessages(prev => [...prev, { 
          id: botMessageId,
          role: 'bot' as const, 
          content: data.message.content 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Communication Error",
        description: "Unable to reach PulseBot. Please try again later.",
        variant: "destructive",
      });
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: 'bot' as const,
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      setBotAvatarState('idle');
    }
  };

  const handleFeedback = (index: number, messageId: string, content: string, isLike: boolean) => {
    // Update UI state
    setMessages(prev => 
      prev.map((msg, i) => {
        if (i === index) {
          // If already liked/disliked, toggle off
          if (isLike && msg.liked) {
            return { ...msg, liked: false, disliked: false };
          }
          if (!isLike && msg.disliked) {
            return { ...msg, liked: false, disliked: false };
          }
          // Otherwise set new state
          return {
            ...msg,
            liked: isLike,
            disliked: !isLike
          };
        }
        return msg;
      })
    );
    
    // Log feedback to Supabase
    const feedbackType = isLike ? 'up' : 'down';
    logFeedback(messageId, content, feedbackType);
    
    // Show thank you state briefly
    setBotAvatarState('happy');
    setTimeout(() => setBotAvatarState('idle'), 2000);
    
    toast({
      description: `Thank you for your feedback!`,
      duration: 2000,
    });
  };

  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
      // Add a system message about language change
      setMessages(prev => [
        ...prev,
        {
          id: `lang_${Date.now()}`,
          role: 'bot' as const,
          content: lang === 'en' 
            ? "Language switched to English." 
            : lang === 'es'
              ? "Idioma cambiado a Español."
              : "Langue changée en Français."
        }
      ]);
    }
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearch(prev => ({
      ...prev,
      query,
      isSearching: query.trim().length > 0
    }));
    
    if (query.trim()) {
      const searchTerms = query.trim().toLowerCase();
      const results = messages.filter(message => 
        message.content.toLowerCase().includes(searchTerms)
      );
      
      setSearch(prev => ({
        ...prev,
        results
      }));
    } else {
      clearSearch();
    }
  };
  
  const clearSearch = () => {
    setSearch({
      query: '',
      isSearching: false,
      results: []
    });
  };

  const toggleChat = () => setOpen(!open);

  // Clear chat history functionality
  const clearHistory = () => {
    // Keep the welcome message but clear everything else
    const welcomeMessage = {
      id: `welcome_${Date.now()}`,
      role: 'bot' as const,
      content: "Hi, I'm PulseBot — your workplace guide! Ask me anything about surveys, PulseScore, or certification."
    };
    
    setMessages([welcomeMessage]);
    
    // Also clear search if active
    if (search.isSearching) {
      clearSearch();
    }
    
    toast({
      description: "Chat history has been cleared",
      duration: 3000,
    });
  };

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
    search,
    handleSearch,
    clearSearch,
    clearHistory
  };
};
