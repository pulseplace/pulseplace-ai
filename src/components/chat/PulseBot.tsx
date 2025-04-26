
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/contexts/ChatbotContext'; 
import { X, Send, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const PulseBot = () => {
  const { messages, isLoading, isChatOpen, sendMessage, toggleChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
    }
  }, [isChatOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    sendMessage(input);
    setInput('');
  };
  
  // Quick prompts for culture improvement
  const quickPrompts = [
    "How can I improve my team's trust rating?",
    "What are best practices for psychological safety?",
    "How to reduce employee burnout?",
    "What metrics matter most for certification?"
  ];

  if (!isChatOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="bg-pulse-gradient hover:opacity-90 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col z-50 max-h-[600px]">
      <div className="bg-pulse-gradient text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">PulseBot - Culture Assistant</h3>
        <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg p-3 max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-pulse-gradient text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
              {msg.role === 'assistant' && (
                <div className="flex justify-end gap-1 mt-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ThumbsDown className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick prompts */}
      <div className="px-4 py-2 flex flex-wrap gap-2">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => {
              sendMessage(prompt);
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about workplace culture..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !input.trim()}
          className="bg-pulse-gradient hover:opacity-90 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default PulseBot;
