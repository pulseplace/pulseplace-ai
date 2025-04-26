
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Bot, FileText, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: 'Landing', path: '/', icon: Home },
  { name: 'PulseBot', path: '/pulsebot', icon: Bot },
  { name: 'Team Dashboards', path: '/dashboard/teams', icon: Users },
  { name: 'Certification Report', path: '/dashboard/certification', icon: FileText },
  { name: 'Admin View', path: '/dashboard/admin', icon: Settings },
];

const DashboardNavigation = () => {
  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-gray-50 hover:text-gray-900",
                isActive
                  ? "bg-gray-50 text-purple-600"
                  : "text-gray-700"
              )
            }
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default DashboardNavigation;
