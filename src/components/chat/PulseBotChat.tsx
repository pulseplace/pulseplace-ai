
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { pulseAssistantConfig } from '@/config/chatbot-config';

interface Message {
  role: 'bot' | 'user';
  content: string;
  liked?: boolean;
  disliked?: boolean;
}

export default function PulseBotChat() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi, I'm PulseBot — your workplace guide! Ask me anything about surveys, PulseScore, or certification." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input.trim() }]);
    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
        body: { 
          messages: messages.map(m => ({ 
            role: m.role === 'bot' ? 'assistant' : 'user', 
            content: m.content 
          })), 
          systemPrompt: pulseAssistantConfig.systemPrompt,
          maxTokens: 500 
        },
      });

      if (error) throw new Error(error.message || 'Failed to get a response');

      // Add bot's response
      if (data && data.message) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: data.message.content 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Communication Error",
        description: "Unable to reach PulseBot. Please try again later.",
        variant: "destructive",
      });
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (index: number, isLike: boolean) => {
    setMessages(prev => 
      prev.map((msg, i) => {
        if (i === index) {
          return {
            ...msg,
            liked: isLike ? !msg.liked : msg.liked,
            disliked: !isLike ? !msg.disliked : msg.disliked
          };
        }
        return msg;
      })
    );
    
    // Here you could also send this feedback to your backend
    toast({
      description: `Thank you for your feedback!`,
      duration: 2000,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button with tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setOpen(!open)}
                className={cn(
                  'h-14 w-14 rounded-full shadow-lg transition-all duration-300',
                  open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
                )}
                aria-label={open ? "Close chat" : "Talk to PulseBot"}
              >
                {open ? (
                  <X className="h-6 w-6 text-white mx-auto" />
                ) : (
                  <Sparkles className="h-6 w-6 text-white mx-auto" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Talk to PulseBot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Chat dialog */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 flex flex-col w-80 max-h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out',
          open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="bg-pulse-gradient text-white p-3 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-white/20">
              <AvatarImage src="" alt="PulseBot" />
              <AvatarFallback className="text-white">
                <Sparkles className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <strong>Hi, I'm PulseBot — your workplace guide!</strong>
            </div>
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="text-white hover:bg-white/20 rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-[350px]">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col">
              <div
                className={cn(
                  'p-3 rounded-lg max-w-[90%]',
                  msg.role === 'bot' 
                    ? 'bg-gray-100 text-gray-800 mr-auto' 
                    : 'bg-pulse-600 text-white ml-auto'
                )}
              >
                {msg.content}
              </div>
              
              {/* Feedback buttons (thumbs up/down) for bot messages only */}
              {msg.role === 'bot' && i > 0 && (
                <div className="flex mt-1 space-x-2">
                  <button 
                    onClick={() => handleFeedback(i, true)}
                    className={cn(
                      "p-1 rounded-full hover:bg-gray-200 transition-colors", 
                      msg.liked && "text-pulse-600"
                    )}
                    aria-label="Helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleFeedback(i, false)}
                    className={cn(
                      "p-1 rounded-full hover:bg-gray-200 transition-colors", 
                      msg.disliked && "text-gray-500"
                    )}
                    aria-label="Not helpful"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[90%] mr-auto">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-pulse-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-pulse-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-pulse-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 border-t flex">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 border rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pulse-600 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className={cn(
              "bg-pulse-gradient text-white px-4 py-2 rounded-r-full text-sm flex items-center justify-center",
              (!input.trim() || loading) && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
