
import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight > 120 ? '120px' : `${scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end border-t p-3 bg-white">
      <textarea
        ref={textareaRef}
        className={cn(
          "flex-grow border border-gray-300 rounded-md py-2 px-3 resize-none focus:outline-none focus:ring-2 focus:ring-pulse-600 focus:border-transparent",
          isLoading && "opacity-50"
        )}
        placeholder="Ask a question..."
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      
      <Button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        size="icon"
        className="ml-2 bg-pulse-gradient text-white shadow-md hover:shadow-lg transition-shadow"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
};

export default ChatInput;
