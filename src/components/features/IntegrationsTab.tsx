
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const IntegrationsTab: React.FC = () => {
  const integrations = [
    { name: 'Slack', category: 'Communication', status: 'Available' },
    { name: 'Microsoft Teams', category: 'Communication', status: 'Available' },
    { name: 'Google Workspace', category: 'Productivity', status: 'Available' },
    { name: 'Zoom', category: 'Meetings', status: 'Available' },
    { name: 'Notion', category: 'Documentation', status: 'Coming Soon' },
    { name: 'Jira', category: 'Project Management', status: 'Coming Soon' },
    { name: 'Salesforce', category: 'CRM', status: 'Coming Soon' },
    { name: 'Asana', category: 'Project Management', status: 'Coming Soon' },
    { name: 'Hubspot', category: 'Marketing', status: 'In Development' },
    { name: 'Zendesk', category: 'Customer Support', status: 'In Development' },
  ];

  return (
    <div className="space-y-8">
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        Seamlessly connect PulsePlace with your existing tools to collect feedback where your team already works.
      </p>
      
      <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Integration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {integrations.map((integration, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {integration.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {integration.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        integration.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : integration.status === 'Coming Soon'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {integration.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center mt-8 space-y-4">
        <p className="text-gray-600">Need to integrate with another tool? Let us know!</p>
        <div>
          <Link to="/contact">
            <Button variant="outline">Request Integration</Button>
          </Link>
          <Link to="/demo" className="ml-4">
            <Button className="bg-pulse-gradient hover:opacity-90">See Integrations Demo</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsTab;
