
import React from 'react';
import {
  BarChart3,
  Building2,
  Settings,
  FileText,
  HelpCircle,
  Home,
  LucideIcon,
  Users,
  Cog,
  ClipboardList,
  PieChart,
  Bot,
  Brain,
  MessageSquare,
  FileBarChart,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={`flex items-center space-x-2 rounded-md p-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-white ${
        isActive ? 'bg-secondary text-white' : 'text-gray-700'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
};

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 px-2 rounded-md hover:bg-secondary md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="border-r w-[300px] sm:w-[300px] p-0">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">PulsePlace.ai</h1>
        </div>
        
        <div className="py-4">
          <nav className="space-y-1 px-2">
            <NavItem to="/dashboard" icon={Home}>
              Dashboard
            </NavItem>
            <NavItem to="/dashboard/organization" icon={Building2}>
              Organization
            </NavItem>
            <NavItem to="/dashboard/team" icon={Users}>
              Team Management
            </NavItem>
            <NavItem to="/dashboard/analytics" icon={BarChart3}>
              Analytics
            </NavItem>
            
            {/* AI Features */}
            <div className="pt-4 pb-2">
              <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                AI Features
              </p>
            </div>
            <NavItem to="/pulsebot" icon={Bot}>
              PulseBot
            </NavItem>
            <NavItem to="/ai-dashboard" icon={Brain}>
              AI Dashboard
            </NavItem>
            <NavItem to="/dashboard/llm-insights" icon={MessageSquare}>
              LLM Insights
            </NavItem>
            <NavItem to="/insights" icon={PieChart}>
              Culture Insights
            </NavItem>
            
            {/* Project Management */}
            <div className="pt-4 pb-2">
              <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Project Management
              </p>
            </div>
            <NavItem to="/task-audit" icon={ClipboardList}>
              Task Audit
            </NavItem>
            <NavItem to="/task-summary" icon={FileBarChart}>
              Task Summary
            </NavItem>
            <NavItem to="/project-handover" icon={FileText}>
              Project Handover
            </NavItem>
            
            {/* Add the Pitch Deck Admin link for admin users */}
            {isAdmin && (
              <NavItem 
                to="/dashboard/pitch-deck-admin" 
                icon={FileText}
              >
                Pitch Deck Admin
              </NavItem>
            )}
            
            <NavItem to="/dashboard/settings" icon={Settings}>
              Settings
            </NavItem>
            <NavItem to="/dashboard/help" icon={HelpCircle}>
              Help & Support
            </NavItem>
          </nav>
        </div>
        
        <div className="p-4">
          <Button variant="outline" className="w-full">
            <Cog className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebar;
