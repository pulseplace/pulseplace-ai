
import { useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { useChatState } from './hooks/useChatState';
import { useSearch } from './hooks/useSearch';
import { useFeedback } from './hooks/useFeedback';
import { useLanguage } from './hooks/useLanguage';
import { useConfetti } from './hooks/useConfetti';
import { callPulseBotAPI } from './services/api-service';

export const usePulseBot = () => {
  const { 
    open, 
    loading, 
    setLoading,
    sessionInfo,
    messages,
    setMessages,
    toggleChat,
    clearHistory
  } = useChatState();

  const { search, handleSearch, clearSearch } = useSearch(messages);
  
  const { 
    botAvatarState, 
    setBotAvatarState, 
    handleFeedback 
  } = useFeedback(messages, setMessages, sessionInfo.id);
  
  const { language, languages, handleLanguageChange } = useLanguage(setMessages);
  
  const { confetti } = useConfetti();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const sendMessage = async (input: string) => {
    if (!input.trim() || loading) return;
    
    // Clear search if active
    if (search.isSearching) {
      clearSearch();
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
      const botResponse = await callPulseBotAPI(
        [...messages, userMessage], 
        language, 
        sessionInfo
      );

      // Add bot's response
      if (botResponse) {
        const botMessageId = `bot_${Date.now()}`;
        setMessages(prev => [...prev, { 
          id: botMessageId,
          role: 'bot', 
          content: botResponse
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
          role: 'bot',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      setBotAvatarState('idle');
    }
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
    clearHistory,
    confetti
  };
};
