
import React from 'react';
import { Badge } from '@/components/ui/badge';

type Risk = {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  likelihood: 'high' | 'medium' | 'low';
  mitigation: string;
};

const risks: Risk[] = [
  {
    title: "AI Engine Integration Delays",
    description: "Real-time processing challenges",
    severity: "high",
    likelihood: "medium",
    mitigation: "Fallback to simplified version with pre-computed insights if real-time processing isn't ready"
  },
  {
    title: "Performance Issues at Scale",
    description: "Dashboard loading times",
    severity: "medium",
    likelihood: "medium",
    mitigation: "Implement data caching and lazy loading of dashboard components"
  },
  {
    title: "Browser Compatibility",
    description: "Safari rendering issues",
    severity: "medium",
    likelihood: "high",
    mitigation: "Schedule additional Safari testing and browser-specific fixes"
  },
  {
    title: "Beta User Adoption",
    description: "Engagement with new features",
    severity: "medium",
    likelihood: "medium",
    mitigation: "Create interactive tutorials and improved onboarding flows"
  }
];

const RisksTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map((risk, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                  <div className="text-sm text-gray-500">{risk.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`bg-${risk.severity === 'high' ? 'red' : 'amber'}-100 text-${risk.severity === 'high' ? 'red' : 'amber'}-800`}>
                    {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`bg-${risk.likelihood === 'high' ? 'red' : 'amber'}-100 text-${risk.likelihood === 'high' ? 'red' : 'amber'}-800`}>
                    {risk.likelihood.charAt(0).toUpperCase() + risk.likelihood.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {risk.mitigation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RisksTab;
