
import React from 'react';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { Milestone } from './types';

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Milestone Tracker</h3>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500">
            <tr>
              <th className="px-4 py-2 text-left">Milestone</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {milestones.map((milestone, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{milestone.title}</td>
                <td className="px-4 py-2">{milestone.date}</td>
                <td className="px-4 py-2">
                  {milestone.status === "completed" ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Completed
                    </span>
                  ) : milestone.status === "upcoming" ? (
                    <span className="flex items-center text-blue-600">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Upcoming
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      Planned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MilestoneTracker;
