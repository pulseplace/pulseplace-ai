
import React from 'react';
import PulseBotChat from '@/components/chat/PulseBotChat';
import MetaTags from '@/components/MetaTags';

const PulseBotPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <MetaTags
        title="PulseBot AI Assistant | PulsePlace.ai"
        description="Chat with our AI assistant to explore your workplace culture data"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">PulseBot AI Assistant</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <p className="text-lg mb-4">
            Welcome to PulseBot, your AI assistant for exploring workplace culture data and analytics.
          </p>
          <p className="mb-4">
            Ask questions about your organization's culture metrics, get insights on team performance, 
            or explore emerging themes from feedback data.
          </p>
          <p>
            Click the chat icon in the bottom right to start a conversation with PulseBot.
          </p>
        </div>
      </div>
      
      <PulseBotChat />
    </div>
  );
};

export default PulseBotPage;
