
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, SmilePlus, Brain, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const exampleMessages = [
  {
    role: 'user',
    content: 'What is PulsePlace certification?',
    time: '10:30 AM'
  },
  {
    role: 'assistant',
    content: 'PulsePlace certification is a data-driven recognition that validates your workplace culture based on actual employee feedback. Unlike traditional "best workplace" lists, our certification uses AI-powered sentiment analysis and engagement metrics to provide an objective measurement of your organization\'s culture.',
    time: '10:31 AM'
  },
  {
    role: 'user',
    content: 'How does the survey process work?',
    time: '10:32 AM'
  },
  {
    role: 'assistant',
    content: 'Our survey process is designed to be minimal-effort with maximum insight. We use short pulse surveys (2-3 minutes) sent at strategic intervals to gather real-time feedback without survey fatigue. Our AI analyzes responses to identify trends, sentiment patterns, and actionable insights that help improve your workplace culture.',
    time: '10:33 AM'
  }
];

const PulseBotDemo = () => {
  const [messages, setMessages] = useState(exampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        role: 'assistant',
        content: `I'd be happy to help with information about "${newMessage}". This is a demo of PulseBot, our AI assistant that helps with workplace culture questions, survey participation, and feedback collection. To try the full version, please click the "Chat with PulseBot" button below.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet PulseBot AI</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our conversational AI assistant transforms how organizations gather feedback and provide insights about workplace culture.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-pulse-100 rounded-full">
                    <Brain className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Conversational Intelligence</h3>
                    <p className="text-gray-600">
                      PulseBot engages employees in natural conversations to gather feedback without survey fatigue.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-pulse-100 rounded-full">
                    <SmilePlus className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">24/7 Availability</h3>
                    <p className="text-gray-600">
                      Employees can share thoughts and get answers about culture initiatives anytime, anywhere.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/pulsebot">
                    <Button className="bg-pulse-gradient hover:opacity-90">
                      Chat with PulseBot <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 border-gray-200 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-pulse-600 text-white p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                        <SmilePlus className="h-5 w-5 text-pulse-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">PulseBot</h3>
                        <p className="text-xs text-pulse-100">AI Assistant</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}
                      >
                        <div 
                          className={`inline-block p-3 rounded-lg max-w-[80%] ${
                            message.role === 'user' 
                              ? 'bg-pulse-100 text-gray-800' 
                              : 'bg-white border border-gray-200 text-gray-700 shadow-sm'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{message.time}</div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="mb-4">
                        <div className="inline-block p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ask PulseBot a question..."
                        className="flex-grow"
                      />
                      <Button type="submit" size="icon" className="bg-pulse-600 hover:bg-pulse-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PulseBotDemo;
