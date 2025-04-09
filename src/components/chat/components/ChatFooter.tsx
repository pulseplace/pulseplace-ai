
import React from 'react';
import { ChatInputBox } from '../ChatInputBox';

interface ChatFooterProps {
  loading: boolean;
  onSendMessage: (message: string) => void;
  placeholderText?: string;
  onClearHistory?: () => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  loading,
  onSendMessage,
  placeholderText,
  onClearHistory
}) => {
  return (
    <div className="p-3 border-t bg-white shrink-0">
      <ChatInputBox
        onSendMessage={onSendMessage}
        loading={loading}
        onClearHistory={onClearHistory}
        placeholderText={placeholderText}
      />
    </div>
  );
};
