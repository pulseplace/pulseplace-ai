
import { Calendar, Cpu } from 'lucide-react';

// Define types for navigation items
export interface NavItem {
  label: string;
  path: string;
}

export interface SubNavItem extends NavItem {
  description: string;
}

// Primary navigation items
export const navItems: NavItem[] = [
  { label: 'Features', path: '/features' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Certification', path: '/certification' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

// Features submenu items
export const featuresSubItems: SubNavItem[] = [
  { label: 'Pulse Surveys', description: 'Collect real-time employee feedback', path: '/features#surveys' },
  { label: 'AI Analytics', description: 'Transform data into actionable insights', path: '/features#ai-analytics' },
  { label: 'PulseBot', description: 'AI assistant for engagement', path: '/pulsebot' },
  { label: 'Dashboard', description: 'Real-time culture metrics', path: '/dashboard-preview' },
];

// Helper to check if a path is active
export const isActive = (location: { pathname: string }, path: string): boolean => {
  return location.pathname === path || location.pathname.startsWith(`${path}/`);
};
