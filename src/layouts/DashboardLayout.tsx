
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

const DashboardLayout = () => {
  const { profile, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

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

  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar - hidden on mobile by default, shown when toggled */}
      <div className={`fixed inset-y-0 left-0 z-50 md:relative md:z-0 transform transition-transform duration-300 ease-in-out ${
        sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <DashboardSidebar isCollapsed={sidebarCollapsed} />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader onMobileMenuClick={toggleMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
