
import React from 'react';
import { BarChart, LayoutDashboard, MessageSquare, Settings, TrendingUp, Users, Calendar, FileText, Mail, Award, UserCog } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
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
            { icon: <LayoutDashboard className="h-4 w-4 mr-3" />, label: "Overview", path: "/dashboard" },
            { icon: <BarChart className="h-4 w-4 mr-3" />, label: "Reports", path: "/dashboard/reports" },
            { icon: <TrendingUp className="h-4 w-4 mr-3" />, label: "Trends", path: "/dashboard/trends" },
            { icon: <Users className="h-4 w-4 mr-3" />, label: "Teams", path: "/dashboard/teams" },
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.path}
              className={`flex w-full items-center px-3 py-2 rounded-md text-sm ${
                isActive(item.path) ? "bg-pulse-50 text-pulse-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
              {isActive(item.path) && <Badge className="ml-auto bg-pulse-100 text-pulse-700 hover:bg-pulse-200">Active</Badge>}
            </Link>
          ))}
        </div>
        
        <div className="mt-6 px-3 py-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MANAGEMENT</p>
        </div>
        <div className="space-y-1 px-3">
          {[
            { icon: <MessageSquare className="h-4 w-4 mr-3" />, label: "Feedback", path: "/dashboard/feedback" },
            { icon: <Calendar className="h-4 w-4 mr-3" />, label: "Surveys", path: "/dashboard/surveys" },
            { icon: <Award className="h-4 w-4 mr-3" />, label: "Certification", path: "/dashboard/share-certification" },
            { icon: <Mail className="h-4 w-4 mr-3" />, label: "Email Templates", path: "/dashboard/email-templates" },
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.path}
              className={`flex w-full items-center px-3 py-2 rounded-md text-sm ${
                isActive(item.path) ? "bg-pulse-50 text-pulse-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="mt-6 px-3 py-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ACCOUNT</p>
        </div>
        <div className="space-y-1 px-3">
          {[
            { icon: <UserCog className="h-4 w-4 mr-3" />, label: "Profile", path: "/dashboard/profile" },
            { icon: <Settings className="h-4 w-4 mr-3" />, label: "Settings", path: "/dashboard/settings" },
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.path}
              className={`flex w-full items-center px-3 py-2 rounded-md text-sm ${
                isActive(item.path) ? "bg-pulse-50 text-pulse-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
