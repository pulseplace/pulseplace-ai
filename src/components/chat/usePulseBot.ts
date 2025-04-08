
import { useSession } from './hooks/useSession';
import { useMessageManagement } from './hooks/useMessageManagement';
import { useLanguageManager } from './hooks/useLanguageManager';
import { useChatUI } from './hooks/useChatUI';
import { useConfetti } from './hooks/useConfetti';
import { useFeedbackHandler } from './hooks/useFeedbackHandler';
import { useMessageSender } from './hooks/useMessageSender';
import { Message, MessageLanguage } from './types';

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
  
  // Create feedback handler
  const handleFeedback = (messageId: string, message: Message, feedback: 'up' | 'down') => {
    setMessages(
      messages.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              liked: feedback === 'up' ? true : false,
              disliked: feedback === 'down' ? true : false
            } 
          : msg
      )
    );
    
    // Additional feedback handling like logging to analytics could be added here
    console.log(`Feedback ${feedback} for message ${messageId}`);
  };
  
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
