
import React from 'react';
import MetaTags from '@/components/MetaTags';
import { useChat } from '@/contexts/ChatbotContext';

const GTMECopilotPage: React.FC = () => {
  const { toggleChat } = useChat();

  // Open chat when user navigates to this page
  React.useEffect(() => {
    toggleChat();
  }, [toggleChat]);

  return (
    <div className="container mx-auto p-6">
      <MetaTags
        title="GTME Copilot | Marketing Optimization Assistant"
        description="Chat with our AI assistant to optimize your marketing funnels and improve performance"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GTME Copilot</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <p className="text-lg mb-4">
            Welcome to GTME Copilot, your AI assistant for marketing optimization and brand presence improvements.
          </p>
          <p className="mb-4">
            Ask questions about marketing funnels, prompt engineering, performance analysis, brand voice consistency, or conversion optimization.
          </p>
          <p>
            Click the chat icon in the bottom right to start a conversation with GTME Copilot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GTMECopilotPage;
