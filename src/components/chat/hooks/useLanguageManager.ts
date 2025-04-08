
import { useState } from 'react';

// Define the available languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
];

export const useLanguageManager = () => {
  const [language, setLanguage] = useState(languages[0].code);

  // Handle language change
  const handleLanguageChange = (code: string) => {
    setLanguage(code);
  };

  return {
    language,
    languages,
    handleLanguageChange
  };
};
