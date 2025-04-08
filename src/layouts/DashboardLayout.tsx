
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useToast } from '@/hooks/use-toast';

const DashboardLayout = () => {
  const { profile, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check for certification-related paths to provide contextual help
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('share-certification') || path.includes('certification-engine')) {
      // Show a helpful toast for certification pages on first visit
      // In a real app, we'd check if this is first visit to avoid repeated toasts
      const hasSeenCertHelp = localStorage.getItem('hasSeenCertHelp');
      if (!hasSeenCertHelp) {
        setTimeout(() => {
          toast({
            title: "Certification Tools",
            description: "Use these tools to share and showcase your PulseScore™ certification",
          });
          localStorage.setItem('hasSeenCertHelp', 'true');
        }, 1000);
      }
    }
  }, [location.pathname, toast]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
