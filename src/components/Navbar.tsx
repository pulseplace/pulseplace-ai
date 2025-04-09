
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Cpu, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your fixed header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const navClasses = `w-full py-4 fixed top-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  }`;

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Group nav items for easier management as app grows
  const navItems = [
    { type: 'link', label: 'Features', path: '/features' },
    { type: 'link', label: 'How It Works', path: '/how-it-works' },
    { type: 'link', label: 'Certification', path: '/certification' },
    { type: 'link', label: 'Insights', path: '/insights' },
    { type: 'link', label: 'About Us', path: '/about-us' },
    { type: 'link', label: 'Contact', path: '/contact' },
  ];

  const featuresSubItems = [
    { label: 'AI Analytics', description: 'Transform data into actionable insights', path: '/features#ai-analytics' },
    { label: 'PulseBot', description: 'AI assistant for engagement', path: '/pulsebot' },
    { label: 'Certification Engine', description: 'Validate workplace culture', path: '/certification' },
    { label: 'Dashboard', description: 'Real-time culture metrics', path: '/dashboard-preview' },
  ];

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
            PulsePlace.ai
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu className="z-50">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={isActive('/features') ? 'text-pulse-600' : ''}
                >
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {featuresSubItems.map((item, index) => (
                      <li key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.path) ? "bg-pulse-50 text-pulse-600" : ""
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{item.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <div className="mt-2 bg-pulse-50 p-3 rounded-md">
                        <div className="flex items-center space-x-2 text-pulse-600 mb-1">
                          <Cpu className="h-4 w-4" />
                          <span className="text-sm font-medium">AI-Powered Technology</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Our platform uses advanced AI and LLM technology to provide deep insights into workplace culture.
                        </p>
                      </div>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {navItems.slice(1).map((item, index) => (
            item.type === 'hash-link' ? (
              <HashLink 
                key={index}
                to={item.path} 
                scroll={scrollWithOffset}
                className={`transition-colors ${
                  location.pathname === '/' && item.path.startsWith('/#') 
                    ? 'text-pulse-600 hover:text-pulse-700' 
                    : 'text-gray-700 hover:text-pulse-600'
                }`}
              >
                {item.label}
              </HashLink>
            ) : (
              <Link 
                key={index}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path) 
                    ? 'text-pulse-600 hover:text-pulse-700' 
                    : 'text-gray-700 hover:text-pulse-600'
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <Link to="/book-demo">
            <Button className="bg-pulse-gradient hover:opacity-90 transition-all flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Book a Demo
            </Button>
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

      {/* Mobile Navigation Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white w-full py-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <div className="border-b pb-2 mb-2">
                <p className="font-medium text-sm text-gray-500 mb-1">Features</p>
                {featuresSubItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path}
                    className="block py-2 pl-3 text-gray-700 hover:text-pulse-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {navItems.slice(1).map((item, index) => (
                item.type === 'hash-link' ? (
                  <HashLink 
                    key={index}
                    to={item.path} 
                    scroll={scrollWithOffset}
                    className={`transition-colors py-2 ${
                      location.pathname === '/' && item.path.startsWith('/#') 
                        ? 'text-pulse-600 hover:text-pulse-700' 
                        : 'text-gray-700 hover:text-pulse-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </HashLink>
                ) : (
                  <Link 
                    key={index}
                    to={item.path}
                    className={`transition-colors py-2 ${
                      isActive(item.path) 
                        ? 'text-pulse-600 hover:text-pulse-700' 
                        : 'text-gray-700 hover:text-pulse-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Link to="/book-demo" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all w-full flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Book a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
