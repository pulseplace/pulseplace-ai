
import React from 'react';
import PulseBotChat from '@/components/chat/PulseBotChat';

const PulseBotPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">PulseBot</h1>
      <p className="mb-8">Chat with PulseBot for instant assistance on PulsePlace features and workplace culture.</p>
      
      {/* PulseBot is already rendered globally in Root.tsx,
          so we don't need to render it again here, but we can add
          documentation or other PulseBot-related content */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">About PulseBot</h2>
        <p>PulseBot is our AI assistant that can help you with:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Understanding workplace culture assessment</li>
          <li>Navigating the PulseScore certification process</li>
          <li>Using the PulsePlace platform effectively</li>
          <li>Answering questions about surveys and assessments</li>
        </ul>
        <p className="mt-4">Click the chat icon in the corner of any page to start a conversation!</p>
      </div>
    </div>
  );
};

export default PulseBotPage;
