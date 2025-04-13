
import React from 'react';
import { Bot, User, Lightbulb } from 'lucide-react';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  suggestedFollowups?: string[];
}

interface ChatMessageProps {
  message: Message;
  onSuggestedQuestionClick: (question: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestedQuestionClick }) => {
  return (
    <div
      className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : ''}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.type === 'user'
            ? 'bg-pulse-100 text-pulse-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <div className="flex items-start gap-2">
          {message.type === 'bot' && (
            <Bot className="h-5 w-5 mt-0.5 text-pulse-600" />
          )}
          <div className="flex-1">
            <p className="text-sm">{message.text}</p>
            
            {message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <Lightbulb className="h-3 w-3" />
                  <span>Suggested questions:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {message.suggestedFollowups.map((question, index) => (
                    <button
                      key={index}
                      className="text-xs bg-white border border-gray-200 rounded-full px-2 py-1 hover:bg-gray-50"
                      onClick={() => onSuggestedQuestionClick(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {message.type === 'user' && (
            <User className="h-5 w-5 mt-0.5 text-pulse-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
