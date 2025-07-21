
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, LogIn, Home, UserPlus, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { navItems, featuresSubItems, dashboardNavItems, isActive } from './NavigationConfig';
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from '@/components/auth/AuthDialog';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  location: { pathname: string };
}

const MobileNavigation = ({ isMenuOpen, setIsMenuOpen, location }: MobileNavigationProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>("features");
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user } = useAuth();

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.open("https://calendly.com/pulseplace-demo/30min", "_blank");
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden">
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
            className="lg:hidden bg-white w-full py-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto absolute top-full left-0 right-0 z-50 border-t"
          >
            <div className="flex flex-col space-y-4">
              <Accordion type="single" collapsible value={openAccordion || undefined} onValueChange={(value) => setOpenAccordion(value)}>
                {/* Features Accordion */}
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
                          className={cn(
                            "block py-2 rounded-md px-2 transition-colors",
                            isActive(location, item.path) 
                              ? "bg-pulse-50 text-pulse-600" 
                              : "text-gray-700 hover:text-pulse-600 hover:bg-gray-50"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-medium">{item.label}</div>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Dashboard Accordion - only show if user is logged in */}
                {user && (
                  <AccordionItem value="dashboard" className="border-b pb-2">
                    <AccordionTrigger className="font-medium text-gray-700 hover:text-pulse-600 py-2">
                      Dashboard
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-3">
                        {dashboardNavItems.map((item, index) => (
                          <Link 
                            key={index}
                            to={item.path}
                            className={cn(
                              "block py-2 rounded-md px-2 transition-colors",
                              isActive(location, item.path) 
                                ? "bg-pulse-50 text-pulse-600" 
                                : "text-gray-700 hover:text-pulse-600 hover:bg-gray-50"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="font-medium">{item.label}</div>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
              
              {/* Main navigation items */}
              <div className="space-y-2 pt-2">
                {navItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path}
                    className={cn(
                      "block py-2 px-2 rounded-md transition-colors",
                      isActive(location, item.path) 
                        ? 'bg-pulse-50 text-pulse-600' 
                        : 'text-gray-700 hover:text-pulse-600 hover:bg-gray-50'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t">
                {/* Login/Dashboard button */}
                {user ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 border-pulse-600 text-pulse-600 hover:bg-pulse-50 rounded-full"
                    >
                      <LogIn className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-pulse-600 text-pulse-600 hover:bg-pulse-50 rounded-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAuthDialogOpen(true);
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                )}

                {/* Demo button */}
                <a 
                  href="https://calendly.com/pulseplace-demo/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleDemoClick}
                >
                  <Button 
                    className="bg-pulse-gradient hover:opacity-90 transition-all w-full flex items-center justify-center gap-2 rounded-full shadow-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Demo
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen}
      />
    </>
  );
};

export default MobileNavigation;
