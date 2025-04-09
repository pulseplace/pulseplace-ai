
import React from 'react';
import { SearchBar } from '../SearchBar';
import { SearchState } from '../types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

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
    <div className="p-2 border-b shrink-0 search-bar-container relative">
      <SearchBar
        query={search.query}
        onSearch={handleSearch}
        onClear={clearSearch}
        resultsCount={search.isSearching ? search.results.length : undefined}
      />
      
      {/* Search help tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-sm">Search your conversation history.<br />Use keywords to find specific topics.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
