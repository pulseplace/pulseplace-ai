
import React from 'react';

interface PlaceholderTabContentProps {
  text: string;
}

const PlaceholderTabContent: React.FC<PlaceholderTabContentProps> = ({ text }) => {
  return (
    <div className="text-gray-500 text-center py-6">
      {text}
    </div>
  );
};

export default PlaceholderTabContent;
