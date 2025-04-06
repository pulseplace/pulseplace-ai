
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your fixed header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <nav className="w-full py-4 bg-white/90 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
            PulsePlace.ai
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <HashLink 
            to="/#features" 
            scroll={scrollWithOffset}
            className="text-gray-700 hover:text-pulse-600 transition-colors"
          >
            Features
          </HashLink>
          <HashLink 
            to="/#how-it-works" 
            scroll={scrollWithOffset}
            className="text-gray-700 hover:text-pulse-600 transition-colors"
          >
            How It Works
          </HashLink>
          <Link to="/methodology" className="text-gray-700 hover:text-pulse-600 transition-colors">Methodology</Link>
          <Link to="/ai-engine" className="text-gray-700 hover:text-pulse-600 transition-colors">Our AI Engine</Link>
          <Link to="/certification" className="text-gray-700 hover:text-pulse-600 transition-colors">Certification</Link>
          <Link to="/about-us" className="text-gray-700 hover:text-pulse-600 transition-colors">About Us</Link>
          <HashLink 
            to="/#join-beta" 
            scroll={scrollWithOffset}
            className="text-gray-700 hover:text-pulse-600 transition-colors"
          >
            Join Beta
          </HashLink>
          <Link to="/join-beta">
            <Button className="bg-pulse-gradient hover:opacity-90 transition-all">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-4 shadow-lg animate-accordion-down">
          <div className="flex flex-col space-y-4">
            <HashLink 
              to="/#features" 
              scroll={scrollWithOffset}
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </HashLink>
            <HashLink 
              to="/#how-it-works" 
              scroll={scrollWithOffset}
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </HashLink>
            <Link 
              to="/methodology" 
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Methodology
            </Link>
            <Link 
              to="/ai-engine" 
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our AI Engine
            </Link>
            <Link 
              to="/certification" 
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Certification
            </Link>
            <Link 
              to="/about-us" 
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <HashLink 
              to="/#join-beta" 
              scroll={scrollWithOffset}
              className="text-gray-700 hover:text-pulse-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Beta
            </HashLink>
            <Link to="/join-beta" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-pulse-gradient hover:opacity-90 transition-all w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
