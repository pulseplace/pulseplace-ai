
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Cpu, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navItems, featuresSubItems, isActive } from './NavigationConfig';
import AuthDialog from '@/components/auth/AuthDialog';

interface DesktopNavigationProps {
  location: { pathname: string };
}

const DesktopNavigation = ({ location }: DesktopNavigationProps) => {
  const { user } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://calendly.com/pulseplace-demo/30min", "_blank");
  };
  
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavigationMenu className="z-50">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={isActive(location, '/features') ? 'text-pulse-600' : ''}
            >
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {featuresSubItems.map((item, index) => (
                  <li key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive(location, item.path) ? "bg-pulse-50 text-pulse-600" : ""
                        )}
                      >
                        <div className="text-sm font-medium leading-none">{item.label}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
                <li className="col-span-2">
                  <div className="mt-2 bg-pulse-50 p-3 rounded-md">
                    <div className="flex items-center space-x-2 text-pulse-600 mb-1">
                      <Cpu className="h-4 w-4" />
                      <span className="text-sm font-medium">AI-Powered Technology</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Our platform uses advanced AI and LLM technology to provide deep insights into workplace culture.
                    </p>
                  </div>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Primary navigation items */}
      {navItems.map((item, index) => (
        <Link 
          key={index}
          to={item.path}
          className={`transition-colors ${
            isActive(location, item.path) 
              ? 'text-pulse-600 hover:text-pulse-700' 
              : 'text-gray-700 hover:text-pulse-600'
          }`}
        >
          {item.label}
        </Link>
      ))}

      {/* Call to action buttons */}
      <div className="flex items-center space-x-3">
        {/* Login/Dashboard button */}
        {user ? (
          <Link to="/dashboard">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 border-pulse-600 text-pulse-600 hover:bg-pulse-50 rounded-full transition-all"
            >
              <LogIn className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 border-pulse-600 text-pulse-600 hover:bg-pulse-50 rounded-full transition-all"
            onClick={() => setIsAuthDialogOpen(true)}
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
            className="bg-pulse-gradient hover:opacity-90 transition-all flex items-center gap-2 rounded-full shadow-sm"
            size="sm"
          >
            <Calendar className="h-4 w-4" />
            Book a Demo
          </Button>
        </a>
      </div>
      
      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen}
      />
    </div>
  );
};

export default DesktopNavigation;
