
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputBoxProps {
  loading: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({ loading, onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
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
        onClick={handleSend}
        disabled={!input.trim() || loading}
        className={cn(
          "bg-pulse-gradient text-white px-4 py-2 rounded-r-full text-sm flex items-center justify-center",
          (!input.trim() || loading) && "opacity-50 cursor-not-allowed"
        )}
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
};
