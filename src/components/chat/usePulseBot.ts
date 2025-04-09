
import { useSession } from './hooks/useSession';
import { useMessageManagement } from './hooks/useMessageManagement';
import { useLanguageManager, cleanupPulseBotState } from './hooks/useLanguageManager';
import { useChatUI } from './hooks/useChatUI';
import { useConfetti } from './hooks/useConfetti';
import { useFeedbackHandler } from './hooks/useFeedbackHandler';
import { useMessageSender } from './hooks/useMessageSender';
import { Message, MessageLanguage } from './types';
import { useEffect } from 'react';

export function usePulseBot() {
  // Get necessary state from our custom hooks
  const { sessionInfo } = useSession();
  const { 
    messages, 
    setMessages, 
    loading, 
    setLoading, 
    botAvatarState, 
    setBotAvatarState, 
    messagesEndRef, 
    scrollToBottom, 
    clearHistory 
  } = useMessageManagement(sessionInfo.id);
  
  const { language, handleLanguageChange } = useLanguageManager();
  const { open, search, toggleChat, handleSearch, clearSearch } = useChatUI();
  const { confetti, triggerConfetti } = useConfetti();
  
  // Cleanup effect - when component unmounts
  useEffect(() => {
    // Return cleanup function
    return () => {
      // Only cleanup when application exits or navigates away
      if (document.visibilityState === 'hidden') {
        // We keep the language preference but clean up other temporary state
        // cleanupPulseBotState is not called here as we want to persist language
        
        // Force loading state to false in case component unmounted while loading
        setLoading(false);
      }
    };
  }, []);
  
  // Error handling function
  const handleError = (error: Error) => {
    console.error('Error in PulseBot:', error);
    // You can add more error handling logic here
  };
  
  // Create feedback handler
  const handleFeedback = useFeedbackHandler(messages, setMessages, sessionInfo.id);
  
  // Setup message sender
  const { sendMessage, isSending } = useMessageSender(
    sessionInfo.id,
    (message: Message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    },
    setLoading,
    handleError
  );

  // Custom handleSearch to pass messages 
  const handleMessageSearch = (query: string) => {
    handleSearch(query, messages);
  };
  
  // Hard reset that clears everything including language preference
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
    sessionInfo
  };
}
