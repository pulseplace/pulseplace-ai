
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  LayoutDashboard, 
  Bot, 
  Rocket, 
  BarChart3, 
  Clock, 
  Users, 
  ArrowRight, 
  Check, 
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Define ROUTES object locally since we no longer export it from config/routes.tsx
const ROUTES = {
  HOME: '/',
  DASHBOARD: {
    INDEX: '/',
    QA_SPRINT: '/dashboard/qa-sprint',
    QA_TESTING: '/dashboard/qa-testing',
    DASHBOARD_QA: '/dashboard/dashboard-qa'
  },
  INSIGHTS: {
    INDEX: '/insights'
  },
  TEAMS: {
    INDEX: '/teams',
    TEAM: (id: string) => `/teams/${id}`
  },
  PULSEBOT: '/pulsebot',
  BOOK_DEMO: '/book-demo'
};

interface DemoReadyLayoutProps {
  children: React.ReactNode;
}

const DemoReadyLayout: React.FC<DemoReadyLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { toast } = useToast();
  const [demoMode, setDemoMode] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  const resetDemoData = async () => {
    setIsResetting(true);
    
    // Simulate resetting demo data
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
      {/* Demo mode indicator */}
      {demoMode && (
        <Alert className="rounded-none border-b border-amber-200 bg-amber-50">
          <AlertDescription className="flex items-center justify-between text-amber-800">
            <span className="flex items-center">
              <Rocket className="h-4 w-4 mr-2" />
              Demo Mode Active: All actions are simulated and data is mocked
            </span>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs border-amber-200 hover:bg-amber-100"
                onClick={() => setResetDialogOpen(true)}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Reset Demo Data
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                onClick={() => setDemoMode(false)}
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to={ROUTES.HOME} className="font-bold text-xl text-pulse-600">
              PulsePlace.ai
            </Link>
            
            <div className="hidden md:flex items-center ml-8 space-x-1">
              <Link to={ROUTES.DASHBOARD.INDEX}>
                <Button 
                  variant={isActive(ROUTES.DASHBOARD.INDEX) ? "secondary" : "ghost"} 
                  size="sm"
                  className="text-sm"
                >
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  Dashboard
                </Button>
              </Link>
              
              <Link to={ROUTES.INSIGHTS.INDEX}>
                <Button 
                  variant={isActive(ROUTES.INSIGHTS.INDEX) ? "secondary" : "ghost"} 
                  size="sm"
                  className="text-sm"
                >
                  <BarChart3 className="h-4 w-4 mr-1.5" />
                  Insights
                </Button>
              </Link>
              
              <Link to={ROUTES.PULSEBOT}>
                <Button 
                  variant={isActive(ROUTES.PULSEBOT) ? "secondary" : "ghost"} 
                  size="sm"
                  className="text-sm"
                >
                  <Bot className="h-4 w-4 mr-1.5" />
                  PulseBot
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant={
                      isActive(ROUTES.TEAMS.INDEX) ? "secondary" : "ghost"
                    } 
                    size="sm" 
                    className="text-sm"
                  >
                    <Users className="h-4 w-4 mr-1.5" />
                    Teams
                    <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.TEAMS.TEAM('alpha')} className="cursor-pointer">Team Alpha</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.TEAMS.TEAM('beta')} className="cursor-pointer">Team Beta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.TEAMS.TEAM('gamma')} className="cursor-pointer">Team Gamma</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.TEAMS.TEAM('sigma')} className="cursor-pointer">Team Sigma</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.TEAMS.TEAM('zeta')} className="cursor-pointer">Team Zeta</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant={
                      isActive(ROUTES.DASHBOARD.QA_SPRINT) || 
                      isActive(ROUTES.DASHBOARD.QA_TESTING) || 
                      isActive(ROUTES.DASHBOARD.DASHBOARD_QA) ? 
                      "secondary" : "ghost"
                    } 
                    size="sm" 
                    className="text-sm"
                  >
                    <Clock className="h-4 w-4 mr-1.5" />
                    QA Sprint
                    <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.DASHBOARD.QA_SPRINT} className="cursor-pointer">Sprint Checklist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.DASHBOARD.QA_TESTING} className="cursor-pointer">QA Testing Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.DASHBOARD.DASHBOARD_QA} className="cursor-pointer">Dashboard QA Plan</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
      
      {/* Mobile navigation for small screens */}
      <div className="md:hidden border-b bg-gray-50 px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 overflow-x-auto py-1 scrollbar-hide">
            <Link to={ROUTES.DASHBOARD.INDEX}>
              <Button 
                variant={isActive(ROUTES.DASHBOARD.INDEX) ? "secondary" : "ghost"} 
                size="sm"
                className="text-xs h-8 px-2.5"
              >
                <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
                Dashboard
              </Button>
            </Link>
            
            <Link to={ROUTES.INSIGHTS.INDEX}>
              <Button 
                variant={isActive(ROUTES.INSIGHTS.INDEX) ? "secondary" : "ghost"} 
                size="sm"
                className="text-xs h-8 px-2.5"
              >
                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                Insights
              </Button>
            </Link>
            
            <Link to={ROUTES.PULSEBOT}>
              <Button 
                variant={isActive(ROUTES.PULSEBOT) ? "secondary" : "ghost"} 
                size="sm"
                className="text-xs h-8 px-2.5"
              >
                <Bot className="h-3.5 w-3.5 mr-1" />
                PulseBot
              </Button>
            </Link>
            
            <Link to={ROUTES.DASHBOARD.QA_SPRINT}>
              <Button 
                variant={isActive(ROUTES.DASHBOARD.QA_SPRINT) ? "secondary" : "ghost"} 
                size="sm"
                className="text-xs h-8 px-2.5"
              >
                <Clock className="h-3.5 w-3.5 mr-1" />
                QA
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            &copy; 2025 PulsePlace.ai – Demo Day Version (April 2025)
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
      
      {/* Reset Demo Data Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Demo Data</DialogTitle>
            <DialogDescription>
              This will reset all demo data to its initial state. Any customizations or changes made during this session will be lost.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-amber-50 rounded-md my-4">
            <div className="text-sm text-amber-800">
              <p className="font-medium">The following will be reset:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Team metrics and insights</li>
                <li>PulseBot conversation history</li>
                <li>QA Sprint tracker progress</li>
                <li>Dashboard statistics</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)} disabled={isResetting}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={resetDemoData}
              disabled={isResetting}
            >
              {isResetting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Demo Data
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoReadyLayout;
