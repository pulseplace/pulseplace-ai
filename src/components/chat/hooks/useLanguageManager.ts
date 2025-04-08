
import { useState, useEffect } from 'react';
import { MessageLanguage } from '../types';

export const useLanguageManager = () => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<MessageLanguage>(() => {
    const savedLanguage = localStorage.getItem('pulsebot_language');
    return (savedLanguage as MessageLanguage) || 'en';
  });

  // Update language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pulsebot_language', language);
  }, [language]);

  // Handler for language change
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
  };

  return { language, handleLanguageChange };
};
