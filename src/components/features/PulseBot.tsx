
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Lightbulb } from 'lucide-react';
import { processPulseBotQuery } from '@/utils/aiAnalytics';

// Sample context data for the bot
const sampleContextData = {
  recentScores: [
    { department: 'Engineering', score: 82 },
    { department: 'Marketing', score: 78 },
    { department: 'Customer Support', score: 69 },
    { department: 'Sales', score: 74 },
    { department: 'HR', score: 85 }
  ],
  topThemes: [
    { name: 'Work-life balance', sentiment: 0.72 },
    { name: 'Communication', sentiment: 0.64 },
    { name: 'Career development', sentiment: 0.45 },
    { name: 'Recognition', sentiment: 0.68 },
    { name: 'Leadership', sentiment: 0.57 }
  ],
  surveyStats: {
    responseRate: 0.82,
    participantCount: 348
  }
};

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  suggestedFollowups?: string[];
}

const PulseBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: "👋 Hi there! I'm PulseBot, your culture analytics assistant. I can help you understand your workplace pulse data, identify trends, and suggest actions to improve your culture. What would you like to know?",
      suggestedFollowups: [
        "What are our top performing departments?",
        "What key themes are emerging from feedback?",
        "How can we improve our overall culture score?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Process the query and generate a response
    setTimeout(() => {
      const botResponse = processPulseBotQuery(userMessage.text, sampleContextData);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: botResponse.response,
        suggestedFollowups: botResponse.suggestedFollowups
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    
    // Focus the textarea
    const textarea = document.getElementById('message-input');
    if (textarea) {
      textarea.focus();
    }
  };
  
  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-pulse-600" />
          PulseBot AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pb-4">
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : ''}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-pulse-100 text-pulse-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'bot' && (
                    <Bot className="h-5 w-5 mt-0.5 text-pulse-600" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.text}</p>
                    
                    {message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                          <Lightbulb className="h-3 w-3" />
                          <span>Suggested questions:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestedFollowups.map((question, index) => (
                            <button
                              key={index}
                              className="text-xs bg-white border border-gray-200 rounded-full px-2 py-1 hover:bg-gray-50"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {message.type === 'user' && (
                    <User className="h-5 w-5 mt-0.5 text-pulse-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="mb-4">
              <div className="max-w-[80%] bg-gray-100 text-gray-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-pulse-600" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-end gap-2">
          <Textarea
            id="message-input"
            placeholder="Ask about your workplace culture data..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none"
          />
          <Button 
            className="shrink-0" 
            size="icon" 
            onClick={handleSendMessage}
            disabled={isProcessing || inputValue.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseBot;
