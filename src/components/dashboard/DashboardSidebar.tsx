
import React from 'react';
import { BarChart, LayoutDashboard, MessageSquare, Settings, TrendingUp, Users, Calendar, FileText, Mail } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const { toast } = useToast();
  
  const handleMenuItemClick = (label: string) => {
    toast({
      title: `${label} Selected`,
      description: `You clicked on the ${label} menu item`,
    });
  };
  
  return (
    <div className="border-r bg-white w-64 min-h-screen hidden md:block">
      <div className="p-6">
        <h2 className="text-lg font-bold flex items-center">
          <span className="bg-pulse-500 text-white p-1 rounded mr-2">P</span>
          PulsePlace Dashboard
        </h2>
      </div>
      <nav className="mt-4">
        <div className="px-3 py-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ANALYTICS</p>
        </div>
        <div className="space-y-1 px-3">
          {[
            { icon: <LayoutDashboard className="h-4 w-4 mr-3" />, label: "Overview", active: true },
            { icon: <BarChart className="h-4 w-4 mr-3" />, label: "Reports" },
            { icon: <TrendingUp className="h-4 w-4 mr-3" />, label: "Trends" },
            { icon: <Users className="h-4 w-4 mr-3" />, label: "Teams" },
          ].map((item, i) => (
            <button 
              key={i} 
              className={`flex w-full items-center px-3 py-2 rounded-md text-sm ${
                item.active ? "bg-pulse-50 text-pulse-700" : "text-gray-700 hover:bg-gray-100"
              } cursor-pointer`}
              onClick={() => handleMenuItemClick(item.label)}
            >
              {item.icon}
              {item.label}
              {item.active && <Badge className="ml-auto bg-pulse-100 text-pulse-700 hover:bg-pulse-200">Active</Badge>}
            </button>
          ))}
        </div>
        
        <div className="mt-6 px-3 py-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MANAGEMENT</p>
        </div>
        <div className="space-y-1 px-3">
          {[
            { icon: <MessageSquare className="h-4 w-4 mr-3" />, label: "Feedback" },
            { icon: <Calendar className="h-4 w-4 mr-3" />, label: "Surveys" },
            { icon: <FileText className="h-4 w-4 mr-3" />, label: "Documentation" },
            { icon: <Settings className="h-4 w-4 mr-3" />, label: "Settings" },
            { icon: <Mail className="h-4 w-4 mr-3" />, label: "Email Templates" },
          ].map((item, i) => (
            <button 
              key={i} 
              className="flex w-full items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuItemClick(item.label)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
