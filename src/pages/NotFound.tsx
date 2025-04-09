
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import MetaTags from '@/components/MetaTags';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Page Not Found | PulsePlace.ai" 
        description="The page you're looking for couldn't be found." 
      />
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-lg px-6">
          <div className="mb-8">
            <span className="inline-block text-7xl font-bold bg-clip-text text-transparent bg-pulse-gradient">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-pulse-gradient hover:opacity-90 w-full sm:w-auto"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              asChild
            >
              <Link to="/join-beta">
                <HelpCircle className="mr-2 h-4 w-4" />
                Join Our Beta
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            <p>Looking for something specific? Try checking out:</p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              <Link to="/dashboard" className="text-pulse-600 hover:underline">Dashboard</Link>
              <span className="text-gray-300">•</span>
              <Link to="/community" className="text-pulse-600 hover:underline">Community</Link>
              <span className="text-gray-300">•</span>
              <Link to="/resources" className="text-pulse-600 hover:underline">Resources</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
