
import React from 'react';
import { ChatProvider } from '@/contexts/ChatbotContext';
import PulseBot from './chat/PulseBot';

// Main wrapper component that provides the chat context
const ChatbotWidget = () => {
  return (
    <ChatProvider>
      <div id="pulsebot-container" className="fixed bottom-6 right-6 z-50">
        <PulseBot />
      </div>
    </ChatProvider>
  );
};

export default ChatbotWidget;
