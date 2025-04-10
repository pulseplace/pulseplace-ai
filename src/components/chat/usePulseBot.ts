
import { useSession } from './hooks/useSession';
import { useChatState } from './hooks/useChatState';
import { useLanguageManager, cleanupPulseBotState } from './hooks/useLanguageManager';
import { useChatUI } from './hooks/useChatUI';
import { useConfetti } from './hooks/useConfetti';
import { useFeedbackHandler } from './hooks/useFeedbackHandler';
import { useMessageSender } from './hooks/useMessageSender';
import { useSearch } from './hooks/useSearch';
import { Message, MessageLanguage, BotAvatarStateValue } from './types';
import { useEffect, useState, useRef } from 'react';

export function usePulseBot() {
  const { sessionInfo } = useSession();
  const { 
    messages, 
    setMessages, 
    addMessage,
    updateLastMessage,
    clearMessages: clearHistory
  } = useChatState();
  
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { language, handleLanguageChange } = useLanguageManager();
  const { open, search, toggleChat, handleSearch, clearSearch } = useChatUI();
  const { confetti, triggerConfetti } = useConfetti();
  
  const [stateTransitionTimer, setStateTransitionTimer] = useState<NodeJS.Timeout | null>(null);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const updateBotAvatarState = (newState: BotAvatarStateValue, duration?: number) => {
    if (stateTransitionTimer) {
      clearTimeout(stateTransitionTimer);
      setStateTransitionTimer(null);
    }
    
    setBotAvatarState(newState);
    
    if (duration) {
      const timer = setTimeout(() => {
        setBotAvatarState('idle');
        setStateTransitionTimer(null);
      }, duration);
      
      setStateTransitionTimer(timer);
    }
  };
  
  useEffect(() => {
    if (loading) {
      updateBotAvatarState('typing');
    } else {
      if (messages.length > 0) {
        updateBotAvatarState('happy', 3000);
      }
    }
  }, [loading, messages.length]);
  
  useEffect(() => {
    return () => {
      if (stateTransitionTimer) {
        clearTimeout(stateTransitionTimer);
      }
      
      if (document.visibilityState === 'hidden') {
        setLoading(false);
      }
    };
  }, [stateTransitionTimer]);
  
  const handleError = (error: Error) => {
    console.error('Error in PulseBot:', error);
    updateBotAvatarState('idle');
  };
  
  const handleFeedback = useFeedbackHandler(messages, setMessages);
  
  const { sendMessage, isLoading, inputValue, setInputValue } = useMessageSender({
    onMessageSent: (message: Message) => {
      const newMessages = [...messages, message];
      setMessages(newMessages);
      scrollToBottom();

      if (search.isSearching) {
        clearSearch();
      }
      
      if (message.role === 'assistant' && 
         (message.content.includes('congratulation') || 
          message.content.includes('great job') ||
          message.content.includes('well done'))) {
        triggerConfetti();
      }
    },
    onLoading: setLoading,
    onError: handleError
  });

  // Fix the TypeScript error by providing a fixed implementation that uses the correct parameter count
  const handleMessageSearch = (query: string, messagesArray = messages, additionalParam?: any) => {
    handleSearch(query, messagesArray);
  };
  
  const hardReset = () => {
    clearHistory();
    cleanupPulseBotState();
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
    clearHistory,
    hardReset,
    search,
    handleSearch: handleMessageSearch,
    clearSearch,
    confetti,
    sessionInfo,
    triggerConfetti,
    updateBotAvatarState
  };
}
