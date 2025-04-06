
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const StickyCta = () => {
  const location = useLocation();
  const isKeyPage = ['/', '/certification', '/join-beta', '/methodology', '/ai-engine'].includes(location.pathname);
  
  if (!isKeyPage) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Link to="/join-beta">
        <Button 
          className="bg-pulse-gradient hover:opacity-90 transition-all font-medium px-4 py-2 shadow-lg rounded-full group"
          size="lg"
        >
          Get Pulse Certified
          <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default StickyCta;
