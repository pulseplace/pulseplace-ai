
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, Settings, HelpCircle, ListTodo } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Dashboard",
  subtitle = "Welcome back to your PulsePlace dashboard"
}) => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications at this time.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="outline" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Dashboard Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/task-admin" className="flex items-center w-full">
                <ListTodo className="mr-2 h-4 w-4" />
                Task Admin
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
