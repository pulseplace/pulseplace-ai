
import React from 'react';
import { SearchBar } from '../SearchBar';
import { SearchState } from '../types';

interface ChatSearchBarProps {
  search: SearchState;
  handleSearch: (query: string) => void;
  clearSearch: () => void;
}

export const ChatSearchBar: React.FC<ChatSearchBarProps> = ({
  search,
  handleSearch,
  clearSearch
}) => {
  return (
    <div className="p-2 border-b shrink-0">
      <SearchBar
        query={search.query}
        onSearch={handleSearch}
        onClear={clearSearch}
        resultsCount={search.isSearching ? search.results.length : undefined}
      />
    </div>
  );
};
