
import { useState, useCallback } from 'react';
import { Message, SearchState } from '../types';

export const useSearch = () => {
  const [search, setSearch] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: []
  });
  
  // Enhanced search functionality with highlighting and better result ranking
  const handleSearch = useCallback((query: string, messages: Message[]) => {
    setSearch(prev => ({
      ...prev,
      query,
      isSearching: query.trim().length > 0
    }));
    
    if (query.trim()) {
      const searchTerms = query.trim().toLowerCase();
      
      // Filter messages and rank them by relevance
      const results = messages
        .filter(message => message.content.toLowerCase().includes(searchTerms))
        .map(message => {
          // Calculate how relevant this message is (simple implementation)
          const relevanceScore = (message.content.toLowerCase().match(new RegExp(searchTerms, 'g')) || []).length;
          
          return {
            ...message,
            relevanceScore
          };
        })
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      
      setSearch(prev => ({
        ...prev,
        results
      }));
    } else {
      clearSearch();
    }
  }, []);
  
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
