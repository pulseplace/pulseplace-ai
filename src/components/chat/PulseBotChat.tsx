
import React, { useRef, useState } from 'react';
import { FloatingChatButton } from './components/FloatingChatButton';
import { ChatContainer } from './components/ChatContainer';
import { Confetti } from './Confetti';
import { TypingIndicatorStyles } from './components/TypingIndicatorStyles';
import { MessageLanguage, BotAvatarStateValue } from './types';
import { TutorialProvider } from './tutorial/TutorialContext';
import { TutorialOverlay } from './tutorial/TutorialOverlay';
import { exportUtils } from './utils/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { useConfetti } from './hooks/useConfetti';
import { useSearch } from './hooks/useSearch';
import { useSession } from './hooks/useSession';
import { useMessageHandler } from './hooks/useMessageHandler';

export default function PulseBotChat() {
  // Use our custom hooks
  const { sessionInfo, setSessionInfo } = useSession();
  const { confetti, triggerConfetti } = useConfetti();
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('neutral');
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<MessageLanguage>('en');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Message handling hook
  const { 
    messages, 
    loading, 
    sendMessage: handleSendMessage, 
    handleFeedback, 
    clearHistory 
  } = useMessageHandler(sessionInfo, setSessionInfo);
  
  // Search hook
  const { search, handleSearch, clearSearch } = useSearch(messages);
  
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
  
  // Get the appropriate state for the FloatingChatButton
  const getBotStateForButton = (): BotAvatarStateValue => {
    if (typeof botAvatarState === 'string') {
      return botAvatarState as BotAvatarStateValue;
    } else if (botAvatarState && typeof botAvatarState === 'object') {
      // Safer check that doesn't rely on specific property
      return 'idle'; // Default to idle if the object structure is not as expected
    }
    return 'idle';
  };
  
  // Toggle chat open/closed
  const toggleChat = () => {
    setOpen(!open);
  };
  
  // Handle sending messages and update bot state
  const sendMessage = (text: string) => {
    setBotAvatarState('thinking');
    handleSendMessage(text, language);
    
    // Reset bot state after response
    setTimeout(() => {
      setBotAvatarState('neutral');
      
      // Show confetti occasionally
      if (Math.random() > 0.8) {
        triggerConfetti({
          particleCount: 70,
          spread: 360,
          startVelocity: 40
        });
      }
    }, 1500);
  };
  
  // Handle language changes
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
    
    // Update session info
    setSessionInfo(prev => ({
      ...prev,
      language: newLanguage
    }));
    
    toast({
      title: "Language Changed",
      description: `PulseBot will now respond in ${getLanguageName(newLanguage)}.`,
    });
  };
  
  // Export chat history
  const [exportFormat, setExportFormat] = useState<'json' | 'pdf'>('json');
  
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
  React.useEffect(() => {
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

  // Automatically open chat when directly navigating to /pulsebot
  React.useEffect(() => {
    if (window.location.pathname.includes('/pulsebot') && !open) {
      toggleChat();
    }
  }, [window.location.pathname, open]);

  return (
    <TutorialProvider>
      {/* Confetti Animation */}
      <Confetti isActive={confetti.isActive} config={confetti.config} />
      
      {/* Floating chat button with tooltip */}
      <FloatingChatButton 
        open={open} 
        toggleChat={toggleChat} 
        botState={getBotStateForButton()}
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
        handleFeedback={handleFeedback}
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

// Helper function to get language name from code
function getLanguageName(code: MessageLanguage): string {
  const languages: Record<MessageLanguage, string> = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'other': 'Other'
  };
  
  return languages[code] || 'Unknown';
}
