
import { useSearchParams } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { useMessageManagement } from './hooks/useMessageManagement';
import { useLanguageManager } from './hooks/useLanguageManager';
import { useChatUI } from './hooks/useChatUI';
import { useConfetti } from './hooks/useConfetti';
import { useFeedbackHandler } from './hooks/useFeedbackHandler';
import { useMessageSender } from './hooks/useMessageSender';

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
  const { language, languages, handleLanguageChange } = useLanguageManager();
  const { open, search, toggleChat, handleSearch, clearSearch } = useChatUI();
  const { confetti, triggerConfetti } = useConfetti();
  const { handleFeedback } = useFeedbackHandler(messages, setMessages, sessionInfo.id);
  const { sendMessage } = useMessageSender(
    messages,
    setMessages,
    setLoading,
    setBotAvatarState,
    scrollToBottom,
    language,
    sessionInfo,
    triggerConfetti
  );

  // Custom handleSearch to pass messages 
  const handleMessageSearch = (query: string) => {
    handleSearch(query, messages);
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
    clearHistory,
    search,
    handleSearch: handleMessageSearch,
    clearSearch,
    confetti,
    sessionInfo
  };
}
