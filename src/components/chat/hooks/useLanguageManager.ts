
import { useState } from 'react';
import { MessageLanguage } from '../types';

export const useLanguageManager = () => {
  const [language, setLanguage] = useState<MessageLanguage>('en');

  const handleLanguageChange = (value: MessageLanguage) => {
    setLanguage(value);
  };

  return {
    language,
    handleLanguageChange
  };
};
