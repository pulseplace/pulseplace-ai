
import { useState, useEffect } from 'react';
import { MessageLanguage } from '../types';

export const useLanguageManager = () => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<MessageLanguage>(() => {
    try {
      const savedLanguage = localStorage.getItem('pulsebot_language');
      // Validate that the saved language is actually a string
      return (typeof savedLanguage === 'string' && savedLanguage) 
        ? (savedLanguage as MessageLanguage) 
        : 'en';
    } catch (error) {
      // In case of any localStorage errors (privacy mode, etc.)
      console.error("Error accessing localStorage:", error);
      return 'en';
    }
  });

  // Update language in localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('pulsebot_language', language);
    } catch (error) {
      // Handle localStorage errors gracefully
      console.error("Error saving to localStorage:", error);
      toast({
        title: "Warning",
        description: "Language preference couldn't be saved for future sessions",
        variant: "warning",
      });
    }
  }, [language]);

  // Handler for language change with validation
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    if (!newLanguage || typeof newLanguage !== 'string') {
      console.error("Invalid language value:", newLanguage);
      return;
    }
    
    setLanguage(newLanguage);
  };

  return { language, handleLanguageChange };
};

// Add a function to cleanup PulseBot state when needed
export const cleanupPulseBotState = () => {
  try {
    // Only remove PulseBot-specific items, not all localStorage
    localStorage.removeItem('pulsebot_language');
    localStorage.removeItem('pulsebot_history');
    localStorage.removeItem('pulsebot_session');
  } catch (error) {
    console.error("Error cleaning up PulseBot state:", error);
  }
};
