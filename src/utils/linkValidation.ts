
import { navItems, featuresSubItems } from '@/components/navigation/NavigationConfig';
import { features } from '@/components/FeatureSection';
import { toast } from '@/components/ui/use-toast';

export interface LinkValidationResult {
  path: string;
  isValid: boolean;
  source: string;
  label?: string;
  description?: string;
}

/**
 * Checks if a route exists in the application
 * This is a simple check that doesn't account for dynamic routes
 */
export const validateInternalLink = (path: string): boolean => {
  // List of known valid routes in the application
  const knownValidRoutes = [
    '/',
    '/auth',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/investor-deck',
    '/pitch-deck-request',
    '/pitch-deck-view',
    '/task-summary',
    '/task-audit',
    '/task-admin',
    '/dashboard',
    '/dashboard/profile-settings',
    '/dashboard/pitch-deck-admin',
    '/dashboard/link-validation',
    '/dashboard/llm-insights',
    '/dashboard/organization',
    '/dashboard/team',
    '/dashboard/analytics',
    '/dashboard/settings',
    '/dashboard/help',
    '/features',
    '/features/surveys',
    '/features/ai-analytics',
    '/features/certification',
    '/features/ai-engine',
    '/features/integrations',
    '/how-it-works',
    '/certification',
    '/insights',
    '/contact',
    '/join-beta',
    '/dashboard-preview',
    '/pulsebot',
    '/ai-dashboard',
    '/book-demo',
    '/demo',
    '/roi-calculator',
    '/project-handover',
    '/privacy-policy',
    '/terms-of-service',
    '/about-us',
    '/resources',
    '/methodology',
  ];

  // Check if the path is in the known valid routes
  // For hash links, validate the base path
  if (path.includes('#')) {
    const basePath = path.split('#')[0];
    // Empty base path (just a hash link on current page) is valid
    return basePath === '' || knownValidRoutes.includes(basePath);
  }

  return knownValidRoutes.includes(path);
};

/**
 * Collects and validates all navigation links
 */
export const validateNavigationLinks = (): LinkValidationResult[] => {
  const results: LinkValidationResult[] = [];

  // Validate main navigation items
  navItems.forEach(item => {
    results.push({
      path: item.path,
      isValid: validateInternalLink(item.path),
      source: 'Main Navigation',
      label: item.label
    });
  });

  // Validate features sub-navigation items
  featuresSubItems.forEach(item => {
    results.push({
      path: item.path,
      isValid: validateInternalLink(item.path),
      source: 'Features Dropdown',
      label: item.label,
      description: item.description
    });
  });

  return results;
};

/**
 * Validates all feature cards links
 */
export const validateFeatureLinks = (): LinkValidationResult[] => {
  return features.map(feature => ({
    path: feature.link,
    isValid: validateInternalLink(feature.link),
    source: 'Feature Card',
    label: feature.title,
    description: feature.description
  }));
};

/**
 * Validates all links in the application
 */
export const validateAllLinks = (): LinkValidationResult[] => {
  return [
    ...validateNavigationLinks(),
    ...validateFeatureLinks(),
    // Add more link validation functions as needed
  ];
};

/**
 * Runs validation and shows toast notifications for any invalid links
 */
export const runLinkValidation = (): LinkValidationResult[] => {
  const results = validateAllLinks();
  const invalidLinks = results.filter(result => !result.isValid);
  
  if (invalidLinks.length > 0) {
    console.error('Invalid links found:', invalidLinks);
    toast({
      variant: "destructive",
      title: "Link Validation Error",
      description: `Found ${invalidLinks.length} invalid links. Check console for details.`
    });
  } else {
    console.log('All links validated successfully');
    toast({
      title: "Link Validation Successful",
      description: "All links validated successfully!"
    });
  }
  
  return results;
};

/**
 * Generates a report of link validation results
 */
export const generateLinkValidationReport = (): string => {
  const results = validateAllLinks();
  const invalidLinks = results.filter(result => !result.isValid);
  const validLinks = results.filter(result => result.isValid);
  
  let report = '# Link Validation Report\n\n';
  report += `**Date Generated:** ${new Date().toLocaleString()}\n\n`;
  report += `**Total Links Checked:** ${results.length}\n`;
  report += `**Valid Links:** ${validLinks.length}\n`;
  report += `**Invalid Links:** ${invalidLinks.length}\n\n`;
  
  if (invalidLinks.length > 0) {
    report += '## Invalid Links\n\n';
    invalidLinks.forEach(link => {
      report += `- [${link.label || 'Unlabeled Link'}](${link.path}) in ${link.source}\n`;
      if (link.description) {
        report += `  - Description: ${link.description}\n`;
      }
    });
    report += '\n';
  }
  
  report += '## Valid Links\n\n';
  const groupedValidLinks = validLinks.reduce((acc, link) => {
    const source = link.source;
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(link);
    return acc;
  }, {} as Record<string, LinkValidationResult[]>);
  
  Object.entries(groupedValidLinks).forEach(([source, links]) => {
    report += `### ${source}\n\n`;
    links.forEach(link => {
      report += `- [${link.label || 'Unlabeled Link'}](${link.path})\n`;
    });
    report += '\n';
  });
  
  return report;
};

// Additional helper function to fix common link issues
export const getFixSuggestions = (path: string): string => {
  // Common typos or mistakes and their corrections
  const corrections: Record<string, string> = {
    '/dashboad': '/dashboard',
    '/pulsebt': '/pulsebot',
    '/feature': '/features',
    '/insight': '/insights',
    '/dashboard/link-validator': '/dashboard/link-validation',
  };
  
  for (const [typo, correction] of Object.entries(corrections)) {
    if (path.includes(typo)) {
      return `Did you mean "${path.replace(typo, correction)}"?`;
    }
  }
  
  return '';
};
