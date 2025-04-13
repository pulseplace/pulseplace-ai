
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 text-red-500">
          <AlertCircle className="h-20 w-20 mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
