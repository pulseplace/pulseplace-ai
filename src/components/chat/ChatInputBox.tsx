
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInputBoxProps {
  onSendMessage: (message: string) => void;
  loading?: boolean;
  onClearHistory?: () => void;
  placeholderText?: string;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ 
  onSendMessage, 
  loading = false,
  onClearHistory,
  placeholderText = "Type your message..."
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showTips, setShowTips] = useState(false);

  // Sample prompts that users can try
  const samplePrompts = [
    "How can we improve employee engagement?",
    "What's the difference between PulseScore and eNPS?",
    "What makes a workplace culture healthy?",
    "How does certification work?"
  ];

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

  const insertSamplePrompt = (prompt: string) => {
    setMessage(prompt);
    setShowTips(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      {/* Sample prompts tips */}
      {showTips && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-md shadow-lg border p-3 z-10">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Try asking about:</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={() => setShowTips(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {samplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => insertSamplePrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-grow">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className="w-full rounded-md border border-gray-300 focus:border-pulse-600 focus:ring-1 focus:ring-pulse-600 p-3 pr-10 resize-none leading-tight min-h-[44px] max-h-[120px] chat-input-field"
            rows={1}
            disabled={loading}
          />
          
          {/* Input help tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowTips(!showTips)}
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Get example questions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
    </div>
  );
};

export { ChatInputBox };
