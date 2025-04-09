
import React from 'react';
import { ChatInputBox } from '../ChatInputBox';

interface ChatFooterProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  onClearHistory: () => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  onSendMessage,
  loading,
  onClearHistory
}) => {
  return (
    <div className="p-3 border-t bg-white shrink-0">
      <ChatInputBox
        onSendMessage={onSendMessage}
        loading={loading}
        onClearHistory={onClearHistory}
      />
    </div>
  );
};
