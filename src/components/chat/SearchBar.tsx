
import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  query: string;
  isSearching: boolean;
  resultCount: number;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  query, 
  isSearching, 
  resultCount, 
  onSearch, 
  onClearSearch 
}) => {
  return (
    <div className="p-2 border-b bg-gray-50">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search messages..."
          className="block w-full pl-10 pr-10 py-2 text-sm border rounded-full focus:ring-pulse-600 focus:border-pulse-600"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
        />
        {query && (
          <button
            onClick={onClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      {isSearching && query && (
        <div className="text-xs text-gray-500 mt-1 ml-1">
          {resultCount > 0 
            ? `Found ${resultCount} result${resultCount !== 1 ? 's' : ''}`
            : 'No results found'}
        </div>
      )}
    </div>
  );
};
