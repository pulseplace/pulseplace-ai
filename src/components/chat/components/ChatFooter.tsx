
import React from 'react';
import { ChatInputBox } from '../ChatInputBox';

interface ChatFooterProps {
  loading: boolean;
  sendMessage: (message: string) => void;
  placeholderText?: string;
  onClearHistory?: () => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  loading,
  sendMessage,
  placeholderText,
  onClearHistory
}) => {
  return (
    <div className="p-3 border-t bg-white shrink-0">
      <ChatInputBox
        onSendMessage={sendMessage}
        loading={loading}
        onClearHistory={onClearHistory}
        placeholderText={placeholderText}
      />
    </div>
  );
};
