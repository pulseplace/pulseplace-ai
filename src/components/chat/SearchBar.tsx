
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch, onClear }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pulse-600 focus:border-transparent"
        placeholder="Search messages..."
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={handleClear}
        >
          <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};
