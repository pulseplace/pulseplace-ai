
import { useState, useCallback } from 'react';
import { Message, SearchState } from '../types';

export const useSearch = (messages: Message[]) => {
  const [search, setSearch] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: []
  });

  const handleSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setSearch({
        query: '',
        isSearching: false,
        results: []
      });
      return;
    }
    
    const lowerCaseTerm = term.toLowerCase();
    const filteredMessages = messages.filter(
      message => message.content.toLowerCase().includes(lowerCaseTerm)
    );
    
    setSearch({
      query: term,
      isSearching: true,
      results: filteredMessages
    });
  }, [messages]);

  const clearSearch = useCallback(() => {
    setSearch({
      query: '',
      isSearching: false,
      results: []
    });
  }, []);

  return {
    search,
    handleSearch,
    clearSearch
  };
};
