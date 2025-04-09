
import { useState, useEffect } from 'react';
import { MessageLanguage } from '../types';
import { useToast } from '@/hooks/use-toast';

// Define a storage key for language preference
const LANGUAGE_STORAGE_KEY = 'pulsebot_language';

// Define supported languages
export const SUPPORTED_LANGUAGES: MessageLanguage[] = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko'
];

export const useLanguageManager = () => {
  const { toast } = useToast();
  
  // Function to safely retrieve language from storage
  const getSavedLanguage = (): MessageLanguage => {
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      
      // Validate that the saved language is actually a string and a supported language
      if (typeof savedLanguage === 'string' && 
          savedLanguage && 
          SUPPORTED_LANGUAGES.includes(savedLanguage as MessageLanguage)) {
        return savedLanguage as MessageLanguage;
      }
      
      return 'en'; // Default to English if not valid
    } catch (error) {
      // In case of any localStorage errors (privacy mode, etc.)
      console.error("Error accessing localStorage:", error);
      return 'en';
    }
  };
  
  // Initialize language from localStorage with proper validation
  const [language, setLanguage] = useState<MessageLanguage>(getSavedLanguage);

  // Update language in localStorage when it changes with robust error handling
  useEffect(() => {
    try {
      // Only save if it's a valid language
      if (SUPPORTED_LANGUAGES.includes(language)) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        console.log(`Language preference saved: ${language}`);
      } else {
        console.warn(`Attempted to save invalid language: ${language}`);
        // Default back to English if somehow an invalid language was set
        setLanguage('en');
      }
    } catch (error) {
      // Handle localStorage errors gracefully
      console.error("Error saving to localStorage:", error);
      toast({
        title: "Warning",
        description: "Language preference couldn't be saved for future sessions",
        variant: "default",
      });
    }
  }, [language, toast]);

  // Handler for language change with validation
  const handleLanguageChange = (newLanguage: MessageLanguage) => {
    // Validate the language before setting it
    if (!newLanguage || typeof newLanguage !== 'string') {
      console.error("Invalid language value:", newLanguage);
      return;
    }
    
    // Make sure it's a supported language
    if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
      console.warn(`Unsupported language: ${newLanguage}, defaulting to English`);
      newLanguage = 'en';
    }
    
    console.log(`Changing language to: ${newLanguage}`);
    setLanguage(newLanguage);
    
    // Show feedback to user
    toast({
      title: "Language Changed",
      description: `PulseBot will now respond in ${getLanguageDisplayName(newLanguage)}`,
      duration: 3000,
    });
  };

  return { language, handleLanguageChange };
};

// Helper function to get display name for a language code
export function getLanguageDisplayName(langCode: string): string {
  const languages: Record<string, string> = {
    'en': 'English',
    'es': 'Spanish (Español)',
    'fr': 'French (Français)',
    'de': 'German (Deutsch)',
    'it': 'Italian (Italiano)',
    'pt': 'Portuguese (Português)',
    'zh': 'Chinese (中文)',
    'ja': 'Japanese (日本語)',
    'ko': 'Korean (한국어)'
  };
  
  return languages[langCode] || langCode;
}

// Add a function to cleanup PulseBot state when needed
export const cleanupPulseBotState = () => {
  try {
    // Only remove PulseBot-specific items, not all localStorage
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    localStorage.removeItem('pulsebot_history');
    localStorage.removeItem('pulsebot_session');
    
    console.log('PulseBot state cleaned up successfully');
  } catch (error) {
    console.error("Error cleaning up PulseBot state:", error);
  }
};
