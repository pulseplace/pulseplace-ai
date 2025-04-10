
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';
import MetaTags from '@/components/MetaTags';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <MetaTags
        title="Page Not Found | PulsePlace.ai"
        description="The page you are looking for doesn't exist or has been moved."
      />
      
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <span className="inline-block h-24 w-24 rounded-full bg-gray-100 p-4">
            <Search className="h-full w-full text-gray-400" />
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          
          <Button className="bg-pulse-gradient" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-gray-500 text-sm">
        <p>Looking for something specific? <Link to="/contact" className="text-pulse-600 hover:underline">Contact our team</Link></p>
      </div>
    </div>
  );
};

export default NotFound;
