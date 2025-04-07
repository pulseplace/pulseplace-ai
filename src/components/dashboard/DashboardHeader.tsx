
import React from 'react';
import { BellRing, PanelLeft, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DashboardHeader = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "New Notifications",
      description: "You have 3 unread notifications",
    });
  };

  const handleSidebarToggle = () => {
    toast({
      title: "Sidebar Toggle",
      description: "This would toggle the sidebar visibility on mobile",
    });
  };
  
  const handleProfileClick = () => {
    toast({
      title: "User Profile",
      description: "This would open your profile settings",
    });
  };
  
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={handleSidebarToggle}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <span className="ml-2 font-bold">Dashboard</span>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleNotificationClick}
          >
            <BellRing className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
          </Button>
          
          <div className="flex items-center ml-4 cursor-pointer" onClick={handleProfileClick}>
            <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center text-pulse-600">
              <User className="h-5 w-5" />
            </div>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-gray-500">HR Director</p>
            </div>
            <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
