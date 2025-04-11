
import { useState } from 'react';
import { MessageLanguage } from './types';
import { useMessageState } from './hooks/useMessageState';
import { useBotResponse } from './hooks/useBotResponse';
import { useConfettiControl } from './hooks/useConfettiControl';
import { useSearch } from './hooks/useSearch';
import { useSession } from './hooks/useSession';

export const usePulseBot = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<MessageLanguage>('en');
  
  // Use our custom hooks
  const { sessionInfo, setSessionInfo } = useSession();
  const { confetti, triggerConfetti } = useConfettiControl();
  const {
    messages,
    loading,
    messagesEndRef,
    setLoading,
    addUserMessage,
    addBotMessage,
    handleFeedback,
    clearHistory
  } = useMessageState();
  
  const { search, handleSearch, clearSearch } = useSearch(messages);
  
  const { botAvatarState, sendMessage } = useBotResponse({
    addUserMessage,
    addBotMessage,
    setLoading
  });
  
  const toggleChat = () => {
    setOpen(!open);
  };
  
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
    
    setSessionInfo(prev => ({
      ...prev,
      language: newLanguage
    }));
  };

  return {
    open,
    loading,
    messages,
    botAvatarState,
    language,
    messagesEndRef,
    sendMessage: (content: string) => sendMessage(content, language),
    handleFeedback,
    handleLanguageChange,
    toggleChat,
    search,
    handleSearch,
    clearSearch,
    clearHistory,
    confetti,
    sessionInfo,
    triggerConfetti
  };
};
