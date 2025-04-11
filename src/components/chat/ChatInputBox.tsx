
import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputBoxProps {
  onSendMessage: (message: string) => void;
  loading?: boolean;
  placeholderText?: string;
  onClearHistory?: () => void;
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  onSendMessage,
  loading = false,
  placeholderText = "Type a message...",
  onClearHistory
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;
    
    onSendMessage(trimmedMessage);
    setMessage('');
    
    // Focus the textarea after sending a message
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholderText}
        className="min-h-[40px] max-h-[120px] resize-none"
        rows={1}
        disabled={loading}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={loading || !message.trim()}
        className="h-10 w-10 rounded-full bg-pulse-gradient shrink-0"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};
