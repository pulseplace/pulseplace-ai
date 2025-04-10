
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
  // Get necessary state from our custom hooks
  const { sessionInfo } = useSession();
  const { 
    messages, 
    setMessages, 
    addMessage,
    updateLastMessage,
    clearMessages: clearHistory
  } = useChatState();
  
  // Additional state
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { language, handleLanguageChange } = useLanguageManager();
  const { open, search, toggleChat, handleSearch, clearSearch } = useChatUI();
  const { confetti, triggerConfetti } = useConfetti();
  
  // Add a state to track timer for avatar state transitions
  const [stateTransitionTimer, setStateTransitionTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Helper function to scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Update bot avatar state with proper transitions
  const updateBotAvatarState = (newState: BotAvatarStateValue, duration?: number) => {
    // Clear any existing timer
    if (stateTransitionTimer) {
      clearTimeout(stateTransitionTimer);
      setStateTransitionTimer(null);
    }
    
    // Set the new state
    setBotAvatarState(newState);
    
    // If duration is provided, schedule reverting back to idle after that time
    if (duration) {
      const timer = setTimeout(() => {
        setBotAvatarState('idle');
        setStateTransitionTimer(null);
      }, duration);
      
      setStateTransitionTimer(timer);
    }
  };
  
  // Effect to handle loading state changes
  useEffect(() => {
    if (loading) {
      // When loading starts, transition to typing state
      updateBotAvatarState('typing');
    } else {
      // When loading ends, if we have messages transition to happy state briefly
      if (messages.length > 0) {
        updateBotAvatarState('happy', 3000); // Show happy state for 3 seconds then revert to idle
      }
    }
  }, [loading, messages.length]);
  
  // Cleanup effect - when component unmounts
  useEffect(() => {
    // Return cleanup function
    return () => {
      // Clear any transition timers
      if (stateTransitionTimer) {
        clearTimeout(stateTransitionTimer);
      }
      
      // Only cleanup when application exits or navigates away
      if (document.visibilityState === 'hidden') {
        // We keep the language preference but clean up other temporary state
        // cleanupPulseBotState is not called here as we want to persist language
        
        // Force loading state to false in case component unmounted while loading
        setLoading(false);
      }
    };
  }, [stateTransitionTimer]);
  
  // Error handling function
  const handleError = (error: Error) => {
    console.error('Error in PulseBot:', error);
    // When error occurs, show idle state
    updateBotAvatarState('idle');
    
    // You can add more error handling logic here
  };
  
  // Create feedback handler
  const handleFeedback = useFeedbackHandler(messages, setMessages);
  
  // Setup message sender with correct arguments
  const { sendMessage, isLoading } = useMessageSender({
    onMessageSent: (message: Message) => {
      // Fix for the TypeScript error - create a new array directly instead of using a callback
      const newMessages = [...messages, message];
      setMessages(newMessages);
      scrollToBottom();

      // Clear search when sending a new message
      if (search.isSearching) {
        clearSearch();
      }
      
      // Trigger confetti for certain types of responses (basic implementation)
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
    sessionInfo,
    triggerConfetti, // Export triggerConfetti for external use
    updateBotAvatarState // Export the state transition function for direct control
  };
}
