
import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StickyCta = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the CTA before
    const hasUserDismissed = localStorage.getItem('sticky-cta-dismissed');
    
    if (hasUserDismissed === 'true') {
      setIsDismissed(true);
      return;
    }
    
    // Show CTA after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('sticky-cta-dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 transform transition-transform duration-300 z-40 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex-1 mb-4 sm:mb-0">
            <p className="text-sm sm:text-base font-medium">
              Ready to see how PulsePlace can transform your workplace culture?
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/demo">
              <Button 
                size="sm" 
                className="bg-pulse-gradient hover:opacity-90"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </Link>
            
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={handleDismiss}
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCta;
