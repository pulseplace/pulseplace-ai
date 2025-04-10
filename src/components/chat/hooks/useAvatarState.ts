
import { useState, useEffect } from 'react';
import { BotAvatarStateValue, Message } from '../types';

export const useAvatarState = (messages: Message[]) => {
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('idle');
  const [stateTransitionTimer, setStateTransitionTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Update bot avatar state with optional timer to revert to idle
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
  
  // Update avatar based on loading state
  useEffect(() => {
    if (loading) {
      updateBotAvatarState('typing');
    } else {
      if (messages.length > 0) {
        updateBotAvatarState('happy', 3000);
      }
    }
  }, [loading, messages.length]);
  
  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (stateTransitionTimer) {
        clearTimeout(stateTransitionTimer);
      }
    };
  }, [stateTransitionTimer]);
  
  return {
    loading,
    setLoading,
    botAvatarState,
    updateBotAvatarState
  };
};
