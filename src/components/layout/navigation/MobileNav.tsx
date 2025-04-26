
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Bot, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const location = useLocation();
  
  // Helper function to determine if a path is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="md:hidden border-b bg-gray-50 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 overflow-x-auto py-1 scrollbar-hide">
          <Link to="/dashboard">
            <Button 
              variant={isActive('/dashboard') ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
              Dashboard
            </Button>
          </Link>
          
          <Link to="/dashboard/insights">
            <Button 
              variant={isActive('/dashboard/insights') ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <BarChart3 className="h-3.5 w-3.5 mr-1" />
              Insights
            </Button>
          </Link>
          
          <Link to="/dashboard/pulsebot">
            <Button 
              variant={isActive('/dashboard/pulsebot') ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <Bot className="h-3.5 w-3.5 mr-1" />
              PulseBot
            </Button>
          </Link>
          
          <Link to="/dashboard/teams">
            <Button 
              variant={isActive('/dashboard/teams') ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <Users className="h-3.5 w-3.5 mr-1" />
              Teams
            </Button>
          </Link>

          <Link to="/dashboard/certification">
            <Button 
              variant={isActive('/dashboard/certification') ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <Award className="h-3.5 w-3.5 mr-1" />
              Certification
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
