
import React from 'react';
import { FloatingChatButton } from './components/FloatingChatButton';
import { ChatContainer } from './components/ChatContainer';
import { Confetti } from './Confetti';
import { TypingIndicatorStyles } from './components/TypingIndicatorStyles';
import { usePulseBot } from './usePulseBot';

export default function PulseBotChat() {
  const {
    open,
    loading,
    messages,
    botAvatarState,
    language,
    languages,
    messagesEndRef,
    sendMessage,
    handleFeedback,
    handleLanguageChange,
    toggleChat,
    search,
    handleSearch,
    clearSearch,
    clearHistory,
    confetti,
    sessionInfo
  } = usePulseBot();

  return (
    <>
      {/* Confetti Animation */}
      <Confetti isActive={confetti.isActive} config={confetti.config} />
      
      {/* Floating chat button with tooltip */}
      <FloatingChatButton open={open} toggleChat={toggleChat} />

      {/* Chat dialog */}
      <ChatContainer
        open={open}
        loading={loading}
        messages={messages}
        botAvatarState={botAvatarState}
        language={language}
        languages={languages}
        messagesEndRef={messagesEndRef}
        handleFeedback={handleFeedback}
        handleLanguageChange={handleLanguageChange}
        toggleChat={toggleChat}
        search={search}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        clearHistory={clearHistory}
        sendMessage={sendMessage}
      />

      {/* Typing indicator styles */}
      <TypingIndicatorStyles />
    </>
  );
}
