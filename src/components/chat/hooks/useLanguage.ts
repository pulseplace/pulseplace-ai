
import { useState } from 'react';
import { pulseAssistantConfig } from '@/config/chatbot-config';
import { Message } from '../types';

export const useLanguage = (setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  const [language, setLanguage] = useState(pulseAssistantConfig.defaultLanguage);
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
      // Add a system message about language change
      setMessages(prev => [
        ...prev,
        {
          id: `lang_${Date.now()}`,
          role: 'bot',
          content: lang === 'en' 
            ? "Language switched to English." 
            : lang === 'es'
              ? "Idioma cambiado a Español."
              : "Langue changée en Français."
        }
      ]);
    }
  };

  return {
    language,
    languages,
    handleLanguageChange
  };
};
