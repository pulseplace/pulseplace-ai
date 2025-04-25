
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatbotContext';
import { Button } from '@/components/ui/button';
import { X, Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { cn } from "@/lib/utils";

const GTMEBot: React.FC = () => {
  const { messages, isLoading, isChatOpen, sendMessage, toggleChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isChatOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  return (
    <>
      {/* Floating chat button with label */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {!isChatOpen && (
          <div className="bg-white rounded-full px-3 py-1 shadow-md mb-1">
            <span className="text-sm font-medium text-gray-700">Need Help?</span>
          </div>
        )}
        <Button
          onClick={toggleChat}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg transition-all duration-300',
            isChatOpen ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90'
          )}
          aria-label={isChatOpen ? "Close chat" : "Open chat"}
        >
          {isChatOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Bot className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Chat dialog */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 flex flex-col w-80 sm:w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)] bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
          isChatOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-semibold">GTME Copilot</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            className="hover:bg-white/20 text-white"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500 my-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </>
  );
};

export default GTMEBot;
