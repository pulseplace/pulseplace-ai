
import { useState } from 'react';
import { SearchState } from '../types';

export const useChatUI = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: []
  });

  // Toggle chat handler
  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  // Handle search
  const handleSearch = (query: string, messagesToSearch: any[]) => {
    setSearch(prev => ({ ...prev, query, isSearching: true }));
    const results = messagesToSearch.filter(msg =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
    setSearch(prev => ({ ...prev, results }));
  };

  // Clear search
  const clearSearch = () => {
    setSearch({ query: '', isSearching: false, results: [] });
  };

  return {
    open,
    search,
    toggleChat,
    handleSearch,
    clearSearch
  };
};
