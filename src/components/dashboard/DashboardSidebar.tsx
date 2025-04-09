
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  FileQuestion, 
  Settings, 
  Zap, 
  MessageSquare, 
  Award, 
  Palette, 
  Database, 
  Cpu, 
  FileCheck, 
  Share, 
  ListChecks 
} from 'lucide-react';

interface DashboardSidebarProps {
  isCollapsed?: boolean;
}

export function DashboardSidebar({
  isCollapsed = false,
}: DashboardSidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Team",
      href: "/assessments",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "PulseBot Analytics",
      href: "/pulsebot-analytics",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Certification",
      href: "/dashboard/certification-engine",
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: "Tasks",
      href: "/task-admin",
      icon: <ListChecks className="h-5 w-5" />,
    },
    {
      title: "Automation",
      href: "/dashboard/mailchimp-events",
      icon: <Zap className="h-5 w-5" />,
    },
  ];
  
  const customizationNavItems = [
    {
      title: "Badge Customization",
      href: "/dashboard/badge-customization",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      title: "Share Certification",
      href: "/dashboard/share-certification",
      icon: <Share className="h-5 w-5" />,
    },
    {
      title: "Export Certification",
      href: "/dashboard/export-certification",
      icon: <FileCheck className="h-5 w-5" />,
    },
  ];
  
  const adminNavItems = [
    {
      title: "QA Dashboard",
      href: "/dashboard/qa",
      icon: <FileQuestion className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className={cn(
      "flex flex-col border-r bg-white/95 max-h-screen h-screen",
      isCollapsed ? "w-[70px]" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-center border-b px-4">
        {isCollapsed ? (
          <img src="/logo-icon.svg" alt="PulsePlace" className="h-8 w-8" />
        ) : (
          <img src="/logo.svg" alt="PulsePlace" className="h-8" />
        )}
      </div>
      <div className="overflow-y-auto py-2 flex flex-col h-full justify-between">
        <div className="space-y-2 px-3">
          <div className="py-2">
            {!isCollapsed && <h4 className="mb-1 px-2 text-xs font-semibold tracking-tight text-gray-500">Main</h4>}
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                    isActive ? "bg-pulse-50 text-pulse-700 font-medium" : "hover:bg-gray-100 text-gray-700",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="py-2">
            {!isCollapsed && <h4 className="mb-1 px-2 text-xs font-semibold tracking-tight text-gray-500">Customization</h4>}
            <div className="space-y-1">
              {customizationNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                    isActive ? "bg-pulse-50 text-pulse-700 font-medium" : "hover:bg-gray-100 text-gray-700",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="py-2">
            {!isCollapsed && <h4 className="mb-1 px-2 text-xs font-semibold tracking-tight text-gray-500">Admin</h4>}
            <div className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                    isActive ? "bg-pulse-50 text-pulse-700 font-medium" : "hover:bg-gray-100 text-gray-700",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        
        <div className="px-3 py-2 mt-auto">
          <div className={cn(
            "flex items-center gap-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800",
            isCollapsed && "justify-center px-2"
          )}>
            <Cpu className="h-5 w-5 text-gray-600" />
            {!isCollapsed && (
              <div>
                <div className="font-medium">PulsePlace Pro</div>
                <div className="text-xs text-gray-500">Beta Access</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
