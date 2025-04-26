
import React from 'react';
import { ChatProvider } from '@/contexts/ChatbotContext';
import PulseBot from './PulseBot';

const PulseBotWidget = () => {
  return (
    <ChatProvider>
      <div id="pulsebot-container" className="fixed bottom-6 right-6 z-50">
        <PulseBot />
      </div>
    </ChatProvider>
  );
};

export default PulseBotWidget;
