
import { useState, useCallback } from 'react';
import { Message } from '../types';

export function useSearchMessages(messagesSource: Message[]) {
  const [search, setSearch] = useState({
    query: '',
    isSearching: false,
    results: [] as Message[]
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
    const filteredMessages = messagesSource.filter(
      message => message.content.toLowerCase().includes(lowerCaseTerm)
    );
    
    setSearch({
      query: term,
      isSearching: true,
      results: filteredMessages
    });
  }, [messagesSource]);
  
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
}
