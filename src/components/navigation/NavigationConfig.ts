import { type Icon } from 'lucide-react';

// Define types for navigation items
export interface NavItem {
  label: string;
  path: string;
}

export interface SubNavItem extends NavItem {
  description: string;
}

// Primary navigation items - Simplified for Alpha
export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'PulseScore', path: '/pulse-score-lite' },
  { label: 'Team Dashboards', path: '/teams' },
  { label: 'PulseBot', path: '/pulsebot' },
];

// Features submenu items - Only showing Alpha-ready features
export const featuresSubItems: SubNavItem[] = [
  { 
    label: 'Culture Certification', 
    description: 'Get your workplace culture certified', 
    path: '/pulse-score-lite' 
  },
  { 
    label: 'Team Insights', 
    description: 'Anonymous feedback and culture metrics', 
    path: '/teams' 
  },
  { 
    label: 'PulseBot Assistant', 
    description: 'AI-powered culture improvement', 
    path: '/pulsebot' 
  },
];

// Helper to check if a path is active
export const isActive = (location: { pathname: string }, path: string): boolean => {
  if (path.includes('#')) {
    // For hash links, just check the main path
    const mainPath = path.split('#')[0];
    return location.pathname === mainPath || location.pathname.startsWith(`${mainPath}/`);
  }
  return location.pathname === path || location.pathname.startsWith(`${path}/`);
};
