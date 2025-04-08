
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Send, Settings, Trash2 } from 'lucide-react';

interface ChatInputBoxProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  onClearHistory: () => void;
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({ 
  onSendMessage, 
  loading,
  onClearHistory
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !loading) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="flex-1 relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="resize-none min-h-[40px] max-h-[120px] pl-3 pr-10 py-2 rounded-full"
          disabled={loading}
        />
      </div>
      
      <div className="flex space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost"
              className="h-10 w-10 rounded-full hover:bg-gray-100"
            >
              <Settings className="h-5 w-5 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onClearHistory}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear chat history
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          type="submit" 
          size="icon"
          className="h-10 w-10 rounded-full bg-pulse-gradient hover:bg-pulse-700"
          disabled={!message.trim() || loading}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
