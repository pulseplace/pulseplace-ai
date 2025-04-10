
import { useState } from 'react';
import { Message, MessageLanguage } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useLanguage = (
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  addMessage: (message: Omit<Message, 'timestamp'>) => Message
) => {
  const { toast } = useToast();
  const [activeLanguage, setActiveLanguage] = useState<MessageLanguage>('en');

  const switchLanguage = async (language: MessageLanguage) => {
    if (language === activeLanguage) return;

    // Add language selection message
    const message = addMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Switching to ${getLanguageName(language)}...`,
      language
    });

    // In a real app, we would make an API call to translate all messages
    // For demo purposes, we'll just change the language flag
    setMessages(prev => 
      prev.map(msg => ({
        ...msg,
        language: msg.id === message.id ? language : msg.language
      }))
    );

    setActiveLanguage(language);

    toast({
      title: "Language Changed",
      description: `Messages will now appear in ${getLanguageName(language)}`,
    });
  };

  const getLanguageName = (code: MessageLanguage): string => {
    const languages: Record<MessageLanguage, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      zh: 'Chinese',
      ja: 'Japanese',
      ko: 'Korean',
      ar: 'Arabic',
      hi: 'Hindi',
      other: 'Other'
    };
    return languages[code] || 'Unknown';
  };

  return {
    activeLanguage,
    switchLanguage,
    getLanguageName
  };
};
