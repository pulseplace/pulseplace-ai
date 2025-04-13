
import React from 'react';
import { Badge } from '@/components/ui/badge';

const CriticalPathTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Complete link validation</div>
                <div className="text-sm text-gray-500">All internal and external links</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jordan Lee</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-red-100 text-red-800">High</Badge>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Finalize AI analytics dashboard</div>
                <div className="text-sm text-gray-500">All visuals and insights panels</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 16</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Morgan Chen</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-red-100 text-red-800">High</Badge>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Complete cross-browser testing</div>
                <div className="text-sm text-gray-500">Chrome, Firefox, Safari, Edge</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 18</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Taylor Wong</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-red-100 text-red-800">High</Badge>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Complete AI engine integration</div>
                <div className="text-sm text-gray-500">Real-time insights and PulseBot</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 19</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alex Rivera</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className="bg-red-100 text-red-800">High</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CriticalPathTab;
