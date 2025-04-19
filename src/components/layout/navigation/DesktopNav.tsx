
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Bot, 
  Users,
  Clock,
  ChevronDown,
  ListTodo,
  Bug,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from '../routes';

const DesktopNav = () => {
  return (
    <div className="hidden md:flex items-center ml-8 space-x-1">
      <Link to={ROUTES.DASHBOARD.INDEX}>
        <Button 
          variant="ghost"
          size="sm"
          className="text-sm"
        >
          <LayoutDashboard className="h-4 w-4 mr-1.5" />
          Dashboard
        </Button>
      </Link>
      
      <Link to={ROUTES.INSIGHTS.INDEX}>
        <Button 
          variant="ghost"
          size="sm"
          className="text-sm"
        >
          <BarChart3 className="h-4 w-4 mr-1.5" />
          Insights
        </Button>
      </Link>
      
      <Link to={ROUTES.PULSEBOT}>
        <Button 
          variant="ghost"
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
            variant="ghost"
            size="sm" 
            className="text-sm"
          >
            <ListTodo className="h-4 w-4 mr-1.5" />
            Task System
            <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/task-tracker">Task Tracker</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/debug-log">Debug Log</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/build-flow">Build Flow</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost"
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
            <Link to={ROUTES.TEAMS.TEAM('alpha')}>Team Alpha</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.TEAMS.TEAM('beta')}>Team Beta</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.TEAMS.TEAM('gamma')}>Team Gamma</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.TEAMS.TEAM('sigma')}>Team Sigma</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.TEAMS.TEAM('zeta')}>Team Zeta</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost"
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
            <Link to={ROUTES.DASHBOARD.QA_SPRINT}>Sprint Checklist</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.DASHBOARD.QA_TESTING}>QA Testing Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.DASHBOARD.DASHBOARD_QA}>Dashboard QA Plan</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopNav;
