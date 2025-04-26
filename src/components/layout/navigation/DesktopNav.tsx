
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Bot, 
  Users,
  Award,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const DesktopNav = () => {
  const location = useLocation();
  
  // Helper function to determine if a path is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="hidden md:flex items-center ml-8 space-x-1">
      <Link to="/dashboard">
        <Button 
          variant={isActive('/dashboard') ? "secondary" : "ghost"}
          size="sm"
          className="text-sm"
        >
          <LayoutDashboard className="h-4 w-4 mr-1.5" />
          Dashboard
        </Button>
      </Link>
      
      <Link to="/dashboard/insights">
        <Button 
          variant={isActive('/dashboard/insights') ? "secondary" : "ghost"}
          size="sm"
          className="text-sm"
        >
          <BarChart3 className="h-4 w-4 mr-1.5" />
          Insights
        </Button>
      </Link>
      
      <Link to="/dashboard/pulsebot">
        <Button 
          variant={isActive('/dashboard/pulsebot') ? "secondary" : "ghost"}
          size="sm"
          className="text-sm"
        >
          <Bot className="h-4 w-4 mr-1.5" />
          PulseBot
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={isActive('/dashboard/teams') ? "secondary" : "ghost"} 
            size="sm" 
            className="text-sm"
          >
            <Users className="h-4 w-4 mr-1.5" />
            Teams
            <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/dashboard/teams/alpha">Team Alpha</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/teams/beta">Team Beta</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/teams/gamma">Team Gamma</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/teams">All Teams</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={isActive('/dashboard/certification') ? "secondary" : "ghost"} 
            size="sm" 
            className="text-sm"
          >
            <Award className="h-4 w-4 mr-1.5" />
            Certification
            <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/dashboard/certification">Certification Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/certification/share">Share Certificate</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/pulse-score-lite">Get Certified</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopNav;
