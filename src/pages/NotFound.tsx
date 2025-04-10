
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import MetaTags from '@/components/MetaTags';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <MetaTags
        title="Page Not Found | PulsePlace.ai"
        description="Sorry, the page you are looking for could not be found."
      />
      
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-4 rounded-full">
            <AlertTriangle size={48} className="text-amber-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg" className="bg-pulse-gradient">
            <Link to="/">Go to Homepage</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
