import { useState, useEffect } from 'react';
import { MessageLanguage } from '../types';

// Local storage key for language preference
const LANGUAGE_STORAGE_KEY = 'pulsebot_language_preference';

// Local storage key for PulseBot settings
const PULSEBOT_SETTINGS_KEY = 'pulsebot_settings';

export const useLanguageManager = () => {
  // Initialize with stored preference or default to English
  const [language, setLanguage] = useState<MessageLanguage>(() => {
    if (typeof window !== 'undefined') {
      // First try the dedicated language storage
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage && isValidLanguage(storedLanguage)) {
        return storedLanguage as MessageLanguage;
      }
      
      // Fall back to settings object if exists
      try {
        const settings = JSON.parse(localStorage.getItem(PULSEBOT_SETTINGS_KEY) || '{}');
        if (settings.language && isValidLanguage(settings.language)) {
          return settings.language as MessageLanguage;
        }
      } catch (e) {
        console.warn('Failed to parse PulseBot settings', e);
      }
    }
    return 'en';
  });

  // Validate language code
  function isValidLanguage(lang: string): boolean {
    return ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko'].includes(lang);
  }

  // Update language and save to storage
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    setLanguage(newLanguage);
    
    // Save to both storage locations for backward compatibility
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      
      // Update the settings object
      const settings = JSON.parse(localStorage.getItem(PULSEBOT_SETTINGS_KEY) || '{}');
      settings.language = newLanguage;
      localStorage.setItem(PULSEBOT_SETTINGS_KEY, JSON.stringify(settings));
      
      console.info('Language preference saved:', newLanguage);
    } catch (e) {
      console.warn('Failed to save language preference', e);
    }
  };

  return { language, handleLanguageChange };
};

// Function to clean up PulseBot state completely
export const cleanupPulseBotState = () => {
  try {
    localStorage.removeItem(PULSEBOT_SETTINGS_KEY);
    // Keep language preference unless explicitly requested to remove
    // localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    console.info('PulseBot state cleaned up');
  } catch (e) {
    console.warn('Failed to clean up PulseBot state', e);
  }
};
