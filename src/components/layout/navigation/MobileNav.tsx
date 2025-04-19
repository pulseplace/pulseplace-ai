
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Bot, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '../routes';

const MobileNav = () => {
  return (
    <div className="md:hidden border-b bg-gray-50 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 overflow-x-auto py-1 scrollbar-hide">
          <Link to={ROUTES.DASHBOARD.INDEX}>
            <Button 
              variant="ghost"
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
              Dashboard
            </Button>
          </Link>
          
          <Link to={ROUTES.INSIGHTS.INDEX}>
            <Button 
              variant="ghost"
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <BarChart3 className="h-3.5 w-3.5 mr-1" />
              Insights
            </Button>
          </Link>
          
          <Link to={ROUTES.PULSEBOT}>
            <Button 
              variant="ghost"
              size="sm"
              className="text-xs h-8 px-2.5"
            >
              <Bot className="h-3.5 w-3.5 mr-1" />
              PulseBot
            </Button>
          </Link>
          
          <Link to={ROUTES.DASHBOARD.QA_SPRINT}>
            <Button 
              variant="ghost"
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
  );
};

export default MobileNav;
