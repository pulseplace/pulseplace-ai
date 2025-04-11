
import { useState, useCallback } from 'react';

export function useChatToggle() {
  const [open, setOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return {
    open,
    setOpen,
    toggleChat
  };
}
