
import { useState, useCallback } from 'react';
import { Message } from '../types';

export const useChatUI = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState({
    query: '',
    isSearching: false,
    results: [] as Message[]
  });

  const toggleChat = () => {
    setOpen(prev => !prev);
  };

  const handleSearch = useCallback((query: string, messages: Message[]) => {
    if (!query.trim()) {
      setSearch({
        query: '',
        isSearching: false,
        results: []
      });
      return;
    }

    const searchTerm = query.toLowerCase();
    
    // Filter messages that contain the search term
    const filteredMessages = messages.filter(
      msg => msg.content.toLowerCase().includes(searchTerm)
    );

    setSearch({
      query,
      isSearching: true,
      results: filteredMessages
    });
  }, []);

  const clearSearch = useCallback(() => {
    setSearch({
      query: '',
      isSearching: false,
      results: []
    });
  }, []);

  return {
    open,
    search,
    toggleChat,
    handleSearch,
    clearSearch
  };
};
