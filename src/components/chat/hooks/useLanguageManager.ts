
import { useState, useCallback } from 'react';
import { MessageLanguage } from '../types';

export const useLanguageManager = () => {
  const [language, setLanguage] = useState<MessageLanguage>('en');

  const handleLanguageChange = useCallback((newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
  }, []);

  const getLanguageName = useCallback((code: MessageLanguage): string => {
    const languages: Record<string, string> = {
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
  }, []);

  return {
    language,
    handleLanguageChange,
    getLanguageName
  };
};
