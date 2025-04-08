
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

export default function PulseBotChat() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm your PulsePlace Assistant. Ask me anything about surveys, PulseScore, or certification." }
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
        body: { messages: messages.map(m => ({ 
          role: m.role === 'bot' ? 'assistant' : 'user', 
          content: m.content 
        })), maxTokens: 500 },
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {!open && (
          <div className="bg-white rounded-full px-3 py-1 shadow-md mb-1">
            <span className="text-sm font-medium text-gray-700">Need Help?</span>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg transition-all duration-300',
            open ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pulse-gradient animate-pulse hover:bg-pulse-700'
          )}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? (
            <X className="h-6 w-6 text-white mx-auto" />
          ) : (
            <Bot className="h-6 w-6 text-white mx-auto" />
          )}
        </button>
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
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            <strong>PulseBot Assistant</strong>
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="text-white hover:bg-white/20 rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2 max-h-[350px]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'p-3 rounded-lg max-w-[90%]',
                msg.role === 'bot' 
                  ? 'bg-gray-100 text-gray-800 mr-auto' 
                  : 'bg-pulse-600 text-white ml-auto'
              )}
            >
              {msg.content}
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
            placeholder="Ask something..."
            className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pulse-600 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className={cn(
              "bg-pulse-gradient text-white px-4 py-2 rounded-r text-sm",
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
