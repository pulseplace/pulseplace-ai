
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputBoxProps {
  onSendMessage: (message: string) => void;
  loading?: boolean;
  onClearHistory?: () => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ 
  onSendMessage, 
  loading = false,
  onClearHistory
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !loading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-grow the textarea (up to a limit)
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const newHeight = Math.min(inputRef.current.scrollHeight, 120);
      inputRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="relative flex-grow">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full rounded-md border border-gray-300 focus:border-pulse-600 focus:ring-1 focus:ring-pulse-600 p-3 pr-10 resize-none leading-tight min-h-[44px] max-h-[120px] chat-input-field"
          rows={1}
          disabled={loading}
        />
      </div>
      <Button 
        type="submit"
        disabled={!message.trim() || loading}
        className="bg-pulse-gradient h-10 w-10 p-0 rounded-full"
        aria-label="Send message"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

export { ChatInputBox };
