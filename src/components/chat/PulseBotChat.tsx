import React, { useRef, useState } from 'react';
import { FloatingChatButton } from './components/FloatingChatButton';
import { ChatContainer } from './components/ChatContainer';
import { Confetti } from './components/Confetti';
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
import { useLanguageManager } from './hooks/useLanguageManager';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { QuickTips } from './components/QuickTips';

export default function PulseBotChat() {
  const { sessionInfo, setSessionInfo } = useSession();
  const { confetti, triggerConfetti } = useConfetti();
  const { language, handleLanguageChange, getLanguageName } = useLanguageManager();
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('neutral');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    messages, 
    loading, 
    sendMessage: handleSendMessage, 
    handleFeedback, 
    clearHistory 
  } = useMessageHandler(sessionInfo, setSessionInfo);
  
  const { search, handleSearch, clearSearch } = useSearch(messages);
  
  const [exportFormat, setExportFormat] = useState<'json' | 'pdf'>('json');
  
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
  
  const getBotStateForButton = (): BotAvatarStateValue => {
    if (typeof botAvatarState === 'string') {
      return botAvatarState as BotAvatarStateValue;
    } else if (botAvatarState && typeof botAvatarState === 'object') {
      return 'idle';
    }
    return 'idle';
  };
  
  const toggleChat = () => {
    setOpen(!open);
    setError(null);
  };
  
  const sendMessage = (text: string) => {
    setError(null);
    setBotAvatarState('thinking');
    
    try {
      handleSendMessage(text, language);
      setTimeout(() => {
        setBotAvatarState('neutral');
        
        if (Math.random() > 0.8) {
          triggerConfetti({
            particleCount: 70,
            spread: 360,
            startVelocity: 40
          });
        }
      }, 1500);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      setBotAvatarState('confused');
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
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
      setError(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      toast({
        title: "Export Failed",
        description: "Could not export chat history. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleExportFormatChange = (format: 'json' | 'pdf') => {
    setExportFormat(format);
    toast({
      title: "Export Format Changed",
      description: `Export format set to ${format.toUpperCase()}`,
      variant: "default",
    });
  };
  
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
  }, [language, handleLanguageChange, languages, toast]);

  useEffect(() => {
    if (window.location.pathname.includes('/pulsebot') && !open) {
      toggleChat();
    }
  }, [open]);

  return (
    <TutorialProvider>
      <Confetti isActive={confetti.isActive} config={confetti.config} />
      
      <FloatingChatButton 
        open={open} 
        toggleChat={toggleChat} 
        botState={getBotStateForButton()}
      />

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
        exportFormat={exportFormat}
        onExportFormatChange={handleExportFormatChange}
      />

      {open && <QuickTips onSelectPrompt={sendMessage} />}

      {error && (
        <Alert variant="destructive" className="fixed bottom-4 left-4 w-auto max-w-md z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <TutorialOverlay />

      <TypingIndicatorStyles />
    </TutorialProvider>
  );
}
