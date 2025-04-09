
import React from 'react';

export interface HighlightedMessageProps {
  content: string;
  searchQuery?: string;
}

export const HighlightedMessage: React.FC<HighlightedMessageProps> = ({ 
  content,
  searchQuery
}) => {
  if (!searchQuery) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  // Split content based on search query to highlight matching parts
  const parts = content.split(new RegExp(`(${searchQuery})`, 'gi'));

  return (
    <div className="whitespace-pre-wrap">
      {parts.map((part, i) => 
        part.toLowerCase() === searchQuery?.toLowerCase() 
          ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark> 
          : <span key={i}>{part}</span>
      )}
    </div>
  );
};
