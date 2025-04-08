
import { useState } from 'react';
import { Message, SearchState } from '../types';

export const useSearch = (messages: Message[]) => {
  const [search, setSearch] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: []
  });
  
  // Search functionality
  const handleSearch = (query: string) => {
    setSearch(prev => ({
      ...prev,
      query,
      isSearching: query.trim().length > 0
    }));
    
    if (query.trim()) {
      const searchTerms = query.trim().toLowerCase();
      const results = messages.filter(message => 
        message.content.toLowerCase().includes(searchTerms)
      );
      
      setSearch(prev => ({
        ...prev,
        results
      }));
    } else {
      clearSearch();
    }
  };
  
  const clearSearch = () => {
    setSearch({
      query: '',
      isSearching: false,
      results: []
    });
  };

  return {
    search,
    handleSearch,
    clearSearch
  };
};
