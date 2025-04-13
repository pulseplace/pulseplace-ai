
import { type Icon } from 'lucide-react';

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
  { label: 'PulseBot', path: '/pulsebot' },
  { label: 'AI Dashboard', path: '/ai-dashboard' },
  { label: 'LLM Insights', path: '/dashboard/llm-insights' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Task Audit', path: '/task-audit' },
  { label: 'Task Summary', path: '/task-summary' },
  { label: 'Project Handover', path: '/project-handover' },
  { label: 'Contact', path: '/contact' },
];

// Features submenu items
export const featuresSubItems: SubNavItem[] = [
  { label: 'Pulse Surveys', description: 'Collect real-time employee feedback', path: '/features#surveys' },
  { label: 'AI Analytics', description: 'Transform data into actionable insights', path: '/features#ai-analytics' },
  { label: 'PulseBot', description: 'AI assistant for engagement', path: '/pulsebot' },
  { label: 'Dashboard', description: 'Real-time culture metrics', path: '/dashboard' },
  { label: 'LLM Insights', description: 'AI-powered language analytics', path: '/dashboard/llm-insights' },
  { label: 'AI Dashboard', description: 'Comprehensive AI workspace', path: '/ai-dashboard' },
  { label: 'Task Management', description: 'Track project tasks and progress', path: '/task-audit' },
  { label: 'Project Reports', description: 'View handover and summary reports', path: '/project-handover' },
  { label: 'ROI Calculator', description: 'See the business impact', path: '/roi-calculator' },
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
