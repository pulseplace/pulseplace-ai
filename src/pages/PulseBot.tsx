
import React from 'react';
import MetaTags from '@/components/MetaTags';
import { useChat } from '@/contexts/ChatbotContext';

const PulseBotPage: React.FC = () => {
  const { toggleChat } = useChat();

  // Open chat when user navigates to this page
  React.useEffect(() => {
    toggleChat();
  }, [toggleChat]);

  return (
    <div className="container mx-auto p-6">
      <MetaTags
        title="PulseBot | PulsePlace.ai"
        description="Chat with our AI assistant to improve your workplace culture and understand certification metrics"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">PulseBot</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <p className="text-lg mb-4">
            Welcome to PulseBot, your AI assistant for workplace culture improvement and certification guidance.
          </p>
          <p className="mb-4">
            Ask questions about workplace culture metrics, certification requirements, team engagement, or get recommendations for improving your organization's culture score.
          </p>
          <p>
            Click the chat icon in the bottom right to start a conversation with PulseBot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PulseBotPage;
