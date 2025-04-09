
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBrandFonts } from '@/hooks/useBrandFonts';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Fix the useState hook usage
  const [theme, setTheme] = useState<Theme>('light');
  
  // Load brand fonts
  useBrandFonts();
  
  // Initialize theme from local storage and system preference on component mount
  useEffect(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('pulseplace-theme');
    // Check for OS preference if no saved theme
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    } else {
      setTheme((savedTheme as Theme) || 'light');
    }
  }, []);

  useEffect(() => {
    // Update data attribute on document for CSS theme switching
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update class for dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--background-light', '#121417'); // Midnight Fog for dark mode
      document.documentElement.style.setProperty('--background-dark', '#0A0A0A'); // Darker shade for dark mode
      document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
      document.documentElement.style.setProperty('--text-muted', '#A0A0A0');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--background-light', '#F7F9FB'); // Soft Cloud for light mode
      document.documentElement.style.setProperty('--background-dark', '#1A1A2E'); // Soulful Midnight for dark containers
      document.documentElement.style.setProperty('--text-primary', '#202020');
      document.documentElement.style.setProperty('--text-muted', '#8A8A8A');
    }
    
    // Save preference to localStorage
    localStorage.setItem('pulseplace-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
