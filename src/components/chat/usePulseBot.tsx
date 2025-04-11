
import { useRef, useEffect } from 'react';
import { MessageLanguage } from './types';
import { useMessageHistory } from './hooks/useMessageHistory';
import { useBotCommunication } from './hooks/useBotCommunication';
import { useConfettiEffect } from './hooks/useConfettiEffect';
import { useSearchMessages } from './hooks/useSearchMessages';
import { useSessionManagement } from './hooks/useSessionManagement';
import { useChatToggle } from './hooks/useChatToggle';

export function usePulseBot() {
  // Use our custom hooks
  const { open, toggleChat } = useChatToggle();
  const { sessionInfo, updateSessionLanguage } = useSessionManagement();
  const { confetti, triggerConfetti } = useConfettiEffect();
  const { 
    messages, 
    addUserMessage, 
    addBotMessage, 
    handleFeedback, 
    clearHistory 
  } = useMessageHistory();
  
  const { 
    loading, 
    botAvatarState, 
    sendMessage: handleSendMessage 
  } = useBotCommunication(
    sessionInfo.id,
    { addUserMessage, addBotMessage, triggerConfetti }
  );
  
  const { search, handleSearch, clearSearch } = useSearchMessages(messages);
  
  // Ref for scrolling to the bottom of the messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Wrapper for sendMessage to include language
  const sendMessage = (content: string, language: MessageLanguage = 'en') => {
    return handleSendMessage(content, language);
  };
  
  // Wrapper for handleFeedback to include sessionId
  const provideFeedback = (messageId: string, value: 'positive' | 'negative') => {
    return handleFeedback(messageId, value, sessionInfo.id);
  };
  
  // Handle language change
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    updateSessionLanguage(newLanguage);
  };

  return {
    open,
    loading,
    messages,
    botAvatarState,
    language: sessionInfo.language,
    messagesEndRef,
    sendMessage,
    handleFeedback: provideFeedback,
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
}
