
import React from 'react';

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  // For a real implementation, use a proper markdown parser
  // For now, we'll just do basic text with new lines for paragraphs
  const formattedContent = content.split('\n\n').map((paragraph, i) => (
    <p key={i} className="mb-2 last:mb-0">
      {paragraph}
    </p>
  ));

  return <div className="markdown-content">{formattedContent}</div>;
};

export default Markdown;
