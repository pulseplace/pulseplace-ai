import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ClipboardList,
  Award,
  Settings,
  PieChart,
  Share2,
  Mail,
  Users,
  Upload,
  Sparkles,
  Brain,
  MessageCircle
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
}

export function DashboardSidebar({ className, isCollapsed }: SidebarNavProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  
  const isAdmin = user?.email?.endsWith('@pulseplace.ai') || true; // For demo, everyone is admin
  
  const sidebarLinks = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      title: 'Dashboard',
      variant: pathname === '/dashboard' ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/surveys',
      icon: ClipboardList,
      title: 'Surveys',
      variant: pathname.includes('/dashboard/surveys') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/share',
      icon: Share2,
      title: 'Share Certification',
      variant: pathname.includes('/dashboard/share') ? 'default' : 'ghost',
    }
  ];
  
  // Admin features
  const adminLinks = [
    {
      href: '/dashboard/team-admin',
      icon: Users,
      title: 'Team Admin',
      variant: pathname.includes('/dashboard/team-admin') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/bulk-upload',
      icon: Upload,
      title: 'Bulk Upload',
      variant: pathname.includes('/dashboard/bulk-upload') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/certification-engine',
      icon: Award,
      title: 'Certification Engine',
      variant: pathname.includes('/dashboard/certification-engine') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/llm-insights',
      icon: Brain,
      title: 'LLM Insights',
      variant: pathname.includes('/dashboard/llm-insights') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/scoring',
      icon: PieChart,
      title: 'Scoring Logic',
      variant: pathname.includes('/dashboard/scoring') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/email-templates',
      icon: Mail,
      title: 'Email Templates',
      variant: pathname.includes('/dashboard/email-templates') ? 'default' : 'ghost',
    },
    {
      href: '/dashboard/mailchimp-events',
      icon: MessageCircle,
      title: 'Mailchimp Events',
      variant: pathname.includes('/dashboard/mailchimp-events') ? 'default' : 'ghost',
    },
  ];
  
  // Settings is available to everyone
  const settingsLink = {
    href: '/dashboard/profile',
    icon: Settings,
    title: 'Settings',
    variant: pathname.includes('/dashboard/profile') ? 'default' : 'ghost',
  };
  
  // Combine the links based on role
  const allLinks = isAdmin 
    ? [...sidebarLinks, ...adminLinks, settingsLink]
    : [...sidebarLinks, settingsLink];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="space-y-1">
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
                PulsePlace.ai
              </h2>
            )}
            <div className="flex flex-col space-y-1">
              <ScrollArea className={isCollapsed ? "h-[calc(100vh-120px)]" : "h-[calc(100vh-160px)]"}>
                <div className={isCollapsed ? 'flex flex-col items-center space-y-2' : 'space-y-1'}>
                  {allLinks.map((link, index) => (
                    <Link to={link.href} key={index}>
                      <Button 
                        variant={link.variant as any}
                        size={isCollapsed ? "icon" : "default"}
                        className={cn(
                          isCollapsed ? 'h-10 w-10' : 'w-full justify-start',
                          link.variant === 'default' && 'bg-pulse-gradient'
                        )}
                      >
                        <link.icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                        {!isCollapsed && link.title}
                      </Button>
                    </Link>
                  ))}
                </div>
                
                {!isCollapsed && (
                  <div className="mt-6 px-3">
                    <div className="rounded-lg border bg-card p-3">
                      <div className="flex items-center space-x-3">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium leading-none">
                            Private Beta
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tayana Solutions Pilot
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
