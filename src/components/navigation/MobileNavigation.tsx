
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { navItems, featuresSubItems, isActive } from './NavigationConfig';
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  location: { pathname: string };
}

const MobileNavigation = ({ isMenuOpen, setIsMenuOpen, location }: MobileNavigationProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>("features");
  const { user } = useAuth();

  return (
    <>
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

      {/* Mobile Navigation Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white w-full py-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto absolute top-full left-0 right-0 z-50"
          >
            <div className="flex flex-col space-y-4">
              <Accordion type="single" collapsible value={openAccordion || undefined} onValueChange={(value) => setOpenAccordion(value)}>
                <AccordionItem value="features" className="border-b pb-2">
                  <AccordionTrigger className="font-medium text-gray-700 hover:text-pulse-600 py-2">
                    Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-3">
                      {featuresSubItems.map((item, index) => (
                        <Link 
                          key={index}
                          to={item.path}
                          className="block py-2 text-gray-700 hover:text-pulse-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-medium">{item.label}</div>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {navItems.slice(1).map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  className={`transition-colors py-2 ${
                    isActive(location, item.path) 
                      ? 'text-pulse-600 hover:text-pulse-700' 
                      : 'text-gray-700 hover:text-pulse-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Login/Dashboard button */}
              <Link to={user ? "/dashboard" : "/auth"} onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-pulse-600 text-pulse-600 hover:bg-pulse-50">
                  <LogIn className="h-4 w-4" />
                  {user ? "Dashboard" : "Sign In"}
                </Button>
              </Link>

              {/* Demo button */}
              <Link to="/demo" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all w-full flex items-center justify-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  Book a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
