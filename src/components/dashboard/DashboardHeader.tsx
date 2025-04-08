
import React, { useState } from 'react';
import { BellRing, PanelLeft, User, ChevronDown, LogOut, Settings, HelpCircle, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from '@/hooks/useOnboarding';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  onMobileMenuClick?: () => void;
}

const DashboardHeader = ({ onMobileMenuClick }: DashboardHeaderProps) => {
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const { progressPercentage } = useOnboarding();
  const navigate = useNavigate();
  const [unreadNotifications] = useState(3);
  
  const handleNotificationClick = () => {
    toast({
      title: "New Notifications",
      description: `You have ${unreadNotifications} unread notifications`,
    });
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign Out Failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const goToOnboarding = () => {
    navigate('/dashboard');
    toast({
      title: "Onboarding",
      description: "Navigating to onboarding wizard to help you get started",
    });
  };
  
  return (
    <header className="bg-white border-b py-2 md:py-4 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMobileMenuClick} className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="text-xl font-bold md:text-2xl bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
            PulsePlace.ai
          </Link>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          {progressPercentage() < 100 && (
            <Button
              variant="outline"
              size="sm"
              className="mr-2 hidden md:flex items-center gap-2"
              onClick={goToOnboarding}
            >
              <HelpCircle className="h-4 w-4" />
              Complete Setup ({progressPercentage()}%)
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleNotificationClick}
          >
            <BellRing className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center ml-2 md:ml-4 cursor-pointer focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center text-pulse-600">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-2 hidden md:block text-left">
                  <p className="text-sm font-medium">
                    {profile ? `${profile.first_name} ${profile.last_name}` : user?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{profile?.role || 'Account'}</p>
                </div>
                <ChevronDown className="h-4 w-4 ml-1 md:ml-2 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile ? `${profile.first_name} ${profile.last_name}` : 'User'}</p>
                  <p className="w-[200px] truncate text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Link to="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/dashboard/profile?tab=preferences">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={goToOnboarding}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Setup Wizard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
