import React, { useEffect, useState } from 'react';
import { FloatingChatButton } from './components/FloatingChatButton';
import { ChatContainer } from './components/ChatContainer';
import { Confetti } from './Confetti';
import { TypingIndicatorStyles } from './components/TypingIndicatorStyles';
import { usePulseBot } from './usePulseBot';
import { MessageLanguage, Message } from './types';
import { useToast } from '@/hooks/use-toast';
import { TutorialProvider } from './tutorial/TutorialContext';
import { TutorialOverlay } from './tutorial/TutorialOverlay';
import { exportUtils } from './utils/exportUtils';

export default function PulseBotChat() {
  const {
    open,
    loading,
    messages,
    botAvatarState,
    language,
    messagesEndRef,
    sendMessage,
    handleFeedback: originalHandleFeedback,
    handleLanguageChange,
    toggleChat,
    search,
    handleSearch,
    clearSearch,
    clearHistory,
    confetti,
    sessionInfo
  } = usePulseBot();
  
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<'json' | 'pdf'>('json');

  // Define available languages
  const languages = [
    { value: 'en' as MessageLanguage, label: 'English' },
    { value: 'es' as MessageLanguage, label: 'Spanish' },
    { value: 'fr' as MessageLanguage, label: 'French' },
    { value: 'de' as MessageLanguage, label: 'German' },
    { value: 'it' as MessageLanguage, label: 'Italian' },
    { value: 'pt' as MessageLanguage, label: 'Portuguese' },
    { value: 'zh' as MessageLanguage, label: 'Chinese' },
    { value: 'ja' as MessageLanguage, label: 'Japanese' },
    { value: 'ko' as MessageLanguage, label: 'Korean' },
  ];
  
  // Create an adapter for handleFeedback to match the expected API
  const handleFeedbackAdapter = (messageId: string, value: 'positive' | 'negative') => {
    // Call the original function with the adapter
    originalHandleFeedback(messageId, value);
  };
  
  // Export chat history
  const handleExportChat = () => {
    if (messages.length <= 1) {
      toast({
        title: "Nothing to export",
        description: "Please have a conversation with PulseBot first",
        variant: "default",
      });
      return;
    }
    
    try {
      if (exportFormat === 'json') {
        exportUtils.exportToJson(messages, `pulsebot-chat-${new Date().toISOString().split('T')[0]}`);
      } else {
        exportUtils.exportToPdf(messages, "PulseBot Chat History");
      }
      
      toast({
        title: "Export Successful",
        description: `Chat history exported as ${exportFormat.toUpperCase()}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Could not export chat history. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Verify the language is valid, or default to English
  useEffect(() => {
    const isValidLanguage = languages.some(lang => lang.value === language);
    
    if (!isValidLanguage && language !== 'en') {
      console.warn(`Invalid language detected: ${language}, resetting to English`);
      handleLanguageChange('en');
      
      toast({
        title: "Language Reset",
        description: "Your language preference was reset to English due to an invalid setting",
        variant: "default",
      });
    }
  }, [language]);

  return (
    <TutorialProvider>
      {/* Confetti Animation */}
      <Confetti isActive={confetti.isActive} config={confetti.config} />
      
      {/* Floating chat button with tooltip */}
      <FloatingChatButton 
        open={open} 
        toggleChat={toggleChat} 
        botState={botAvatarState}
      />

      {/* Chat dialog */}
      <ChatContainer
        open={open}
        loading={loading}
        messages={messages}
        botAvatarState={botAvatarState}
        language={language}
        languages={languages}
        messagesEndRef={messagesEndRef}
        handleFeedback={handleFeedbackAdapter}
        handleLanguageChange={handleLanguageChange}
        toggleChat={toggleChat}
        search={search}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        clearHistory={clearHistory}
        sendMessage={sendMessage}
        onExportChat={handleExportChat}
      />

      {/* Tutorial Overlay */}
      <TutorialOverlay />

      {/* Typing indicator styles */}
      <TypingIndicatorStyles />
    </TutorialProvider>
  );
}
