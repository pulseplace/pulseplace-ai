import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from 'lucide-react';
import { processPulseBotQuery } from '@/utils/ai/pulseBot';
import { toast } from 'sonner';
import QuickPrompts from './pulsebot/QuickPrompts';
import ProgressBar from './pulsebot/ProgressBar';
import ChatMessage, { Message } from './pulsebot/ChatMessage';

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

const PulseBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: "👋 Hi there! I'm PulseBot, your culture analytics assistant. I can help you understand your workplace pulse data, identify trends, and suggest actions to improve your culture. What would you like to know?",
      suggestedFollowups: [
        "Summarize Team Alpha",
        "Show risk for Team Gamma",
        "Why is Team Beta eligible for certification?",
        "Summarize Team Sigma",
        "Summarize Team Zeta",
        "What are our top performing departments?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiProgressVisible, setAiProgressVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (isProcessing) {
      setAiProgressVisible(true);
      const interval = setInterval(() => {
        setAiProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      return () => {
        clearInterval(interval);
        setTimeout(() => {
          setAiProgressVisible(false);
          setAiProgress(0);
        }, 500);
      };
    }
  }, [isProcessing]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
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
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    
    const textarea = document.getElementById('message-input');
    if (textarea) {
      textarea.focus();
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputValue(promptText);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
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
        <QuickPrompts onPromptClick={handleQuickPrompt} />
      
        <ProgressBar progress={aiProgress} isVisible={aiProgressVisible} />
      
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onSuggestedQuestionClick={handleSuggestedQuestion} 
            />
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
