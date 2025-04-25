
import React from 'react';
import { ChatProvider } from '@/contexts/ChatbotContext';
import GTMEBot from './chat/PulseBot';  // Keeping the file name but using the correct component name

// Main wrapper component that provides the chat context
const ChatbotWidget = () => {
  return (
    <ChatProvider>
      <div id="gtme-copilot-container" className="fixed bottom-6 right-6 z-50">
        <GTMEBot />
      </div>
    </ChatProvider>
  );
};

export default ChatbotWidget;
