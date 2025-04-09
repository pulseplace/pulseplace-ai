
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { SubscriberSearchProps } from './SubscriberTypes';

const SubscriberSearch: React.FC<SubscriberSearchProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search by name or email..."
        onChange={handleSearch}
        value={searchTerm}
        className="pl-8"
      />
    </div>
  );
};

export default SubscriberSearch;
