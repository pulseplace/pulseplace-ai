
import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  resultsCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onSearch,
  onClear,
  resultsCount
}) => {
  const [inputValue, setInputValue] = useState(query || '');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };
  
  const handleClear = () => {
    setInputValue('');
    onClear();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        
        <Input
          ref={inputRef}
          type="search"
          className="pl-10 pr-10 py-2 rounded-lg"
          placeholder="Search messages..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        {inputValue && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={handleClear}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          </div>
        )}
      </form>
      
      {typeof resultsCount !== 'undefined' && query && (
        <div className="absolute left-0 -bottom-6 text-xs text-gray-500">
          {resultsCount} {resultsCount === 1 ? 'result' : 'results'} found
        </div>
      )}
    </div>
  );
};
