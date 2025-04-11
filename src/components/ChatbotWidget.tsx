
import React from 'react';
import { ChatProvider, useChat } from '@/contexts/ChatbotContext';
import PulseBot from './chat/PulseBot';

// Internal component that uses the chat context
const ChatbotContent = () => {
  return <PulseBot />;
};

// Main wrapper component that provides the chat context
const ChatbotWidget = () => {
  return (
    <ChatProvider>
      <div id="pulsebot-container">
        <ChatbotContent />
      </div>
    </ChatProvider>
  );
};

export default ChatbotWidget;
