
import { useEffect } from 'react';

export const useBrandFonts = () => {
  useEffect(() => {
    // Load the Neue Haas Grotesk Display Pro font family
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://use.typekit.net/cnk4mgd.css'; // This is a placeholder, we'd need an actual Adobe Fonts license
    document.head.appendChild(link);
    
    // Load Inter font
    const interLink = document.createElement('link');
    interLink.rel = 'stylesheet';
    interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(interLink);
    
    return () => {
      // Clean up
      document.head.removeChild(link);
      document.head.removeChild(interLink);
    };
  }, []);
};
