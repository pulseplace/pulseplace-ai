
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Memoize the scroll handler to avoid recreating on each render
  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize scroll state on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const navClasses = `w-full py-3 fixed top-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  }`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation location={location} />

          {/* Mobile Navigation Toggle and Menu */}
          <MobileNavigation 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            location={location} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
