
import React from 'react';

interface HtmlCodePreviewProps {
  htmlContent: string;
}

const HtmlCodePreview: React.FC<HtmlCodePreviewProps> = ({ htmlContent }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px]">
      <pre className="text-xs whitespace-pre-wrap">{htmlContent}</pre>
    </div>
  );
};

export default HtmlCodePreview;
