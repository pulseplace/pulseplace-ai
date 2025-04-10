
import { useSession } from './hooks/useSession';
import { useChatState } from './hooks/useChatState';
import { useLanguageManager, cleanupPulseBotState } from './hooks/useLanguageManager';
import { useChatUI } from './hooks/useChatUI';
import { useConfetti } from './hooks/useConfetti';
import { useFeedbackHandler } from './hooks/useFeedbackHandler';
import { useMessageSender } from './hooks/useMessageSender';
import { useSearch } from './hooks/useSearch';
import { useAvatarState } from './hooks/useAvatarState';
import { Message, MessageLanguage, BotAvatarStateValue } from './types';
import { useEffect, useRef } from 'react';

export function usePulseBot() {
  // Core hooks
  const { sessionInfo } = useSession();
  const { 
    messages, 
    setMessages, 
    addMessage,
    updateLastMessage,
    clearMessages: clearHistory
  } = useChatState();
  
  const { language, handleLanguageChange } = useLanguageManager();
  const { open, search, toggleChat, handleSearch, clearSearch } = useChatUI();
  const { confetti, triggerConfetti } = useConfetti();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Bot avatar state management
  const { 
    loading,
    botAvatarState, 
    updateBotAvatarState 
  } = useAvatarState(messages);
  
  // Scroll to bottom functionality
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Error handling
  const handleError = (error: Error) => {
    console.error('Error in PulseBot:', error);
    updateBotAvatarState('idle');
  };
  
  // Feedback handling
  const handleFeedback = useFeedbackHandler(messages, setMessages, sessionInfo.id);
  
  // Message sending
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
    onLoading: (isLoading) => updateBotAvatarState(isLoading ? 'typing' : 'idle'),
    onError: handleError
  });

  // Search handling
  const handleMessageSearch = (query: string) => {
    handleSearch(query, messages);
  };
  
  // Complete reset functionality
  const hardReset = () => {
    clearHistory();
    cleanupPulseBotState();
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (document.visibilityState === 'hidden') {
        updateBotAvatarState('idle');
      }
    };
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
