
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';
import DemoModeAlert from './DemoModeAlert';
import ResetDialog from './ResetDialog';
import { ROUTES } from './routes';

interface DemoReadyLayoutProps {
  children: React.ReactNode;
}

const DemoReadyLayout: React.FC<DemoReadyLayoutProps> = ({ children }) => {
  const { toast } = useToast();
  const [demoMode, setDemoMode] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
  const resetDemoData = async () => {
    setIsResetting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsResetting(false);
    setResetDialogOpen(false);
    
    toast({
      title: "Demo Reset Complete",
      description: "All demo data has been restored to its initial state."
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {demoMode && (
        <DemoModeAlert 
          onReset={() => setResetDialogOpen(true)}
          onDismiss={() => setDemoMode(false)}
        />
      )}
      
      <header className="bg-white border-b shadow-sm py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to={ROUTES.HOME} className="font-bold text-xl text-pulse-600">
              PulsePlace.ai
            </Link>
            <DesktopNav />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to={ROUTES.DASHBOARD.QA_TESTING}>
                <Rocket className="h-4 w-4 mr-1.5" />
                Demo Day Readiness
              </Link>
            </Button>
            <Button className="hidden md:flex h-9 bg-pulse-gradient">
              Run New Survey
            </Button>
          </div>
        </div>
      </header>
      
      <MobileNav />
      
      <main className="flex-1 py-6">
        {children}
      </main>
      
      <footer className="bg-white border-t py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} PulsePlace.ai – Demo Day Version (April 2025)
          </div>
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <Link to={ROUTES.DASHBOARD.QA_SPRINT} className="hover:text-gray-800 transition-colors">
              QA Sprint Tracker
            </Link>
            <Link to={ROUTES.PULSEBOT} className="hover:text-gray-800 transition-colors">
              PulseBot Demo
            </Link>
            <Link to={ROUTES.DASHBOARD.QA_TESTING} className="hover:text-gray-800 transition-colors">
              Demo Readiness
            </Link>
          </div>
        </div>
      </footer>
      
      <ResetDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        onReset={resetDemoData}
        isResetting={isResetting}
      />
    </div>
  );
};

export default DemoReadyLayout;
