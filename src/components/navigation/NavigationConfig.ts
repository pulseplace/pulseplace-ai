
import { type Icon } from 'lucide-react';

// Define types for navigation items
export interface NavItem {
  label: string;
  path: string;
}

export interface SubNavItem extends NavItem {
  description: string;
}

// Primary navigation items - simplified for less clutter
export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about-us' },
  { label: 'Contact', path: '/contact' },
];

// Features submenu items - consolidated
export const featuresSubItems: SubNavItem[] = [
  { label: 'Pulse Surveys', description: 'Collect real-time employee feedback', path: '/features#surveys' },
  { label: 'AI Analytics', description: 'Transform data into actionable insights', path: '/features#ai-analytics' },
  { label: 'PulseBot', description: 'AI assistant for engagement', path: '/pulsebot' },
  { label: 'Dashboard', description: 'Real-time culture metrics', path: '/dashboard' },
  { label: 'Certification', description: 'Validate workplace culture', path: '/certification' },
  { label: 'ROI Calculator', description: 'See the business impact', path: '/roi-calculator' },
];

// Dashboard navigation items - for internal use
export const dashboardNavItems: SubNavItem[] = [
  { label: 'Dashboard', description: 'Main dashboard view', path: '/dashboard' },
  { label: 'Insights', description: 'Culture analytics', path: '/insights' },
  { label: 'PulseBot', description: 'AI assistant', path: '/pulsebot' },
  { label: 'Task Tracker', description: 'Project management', path: '/task-tracker' },
  { label: 'AI Dashboard', description: 'Advanced AI features', path: '/ai-dashboard' },
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
