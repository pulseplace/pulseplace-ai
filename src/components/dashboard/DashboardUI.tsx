
import React from 'react';
import { Card } from "@/components/ui/card";
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import TeamPulseTrends from './TeamPulseTrends';
import SentimentAnalysis from './SentimentAnalysis';
import SkillsGapAnalysis from './SkillsGapAnalysis';

const DashboardUI = () => {
  return (
    <Card className="overflow-hidden border-2 border-gray-200 shadow-xl">
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        <div className="flex flex-col flex-grow overflow-y-auto">
          <DashboardHeader />
          <div className="p-6">
            <div className="space-y-6">
              <DashboardOverview />
              
              {/* Additional visualizations */}
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
                <TeamPulseTrends />
                <SkillsGapAnalysis />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
                <SentimentAnalysis />
                <div className="col-span-4">
                  <Card className="h-full shadow-md">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 h-5 w-5 mt-0.5 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-green-600"></span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Team communication sentiment has improved by 12% in the last quarter
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 h-5 w-5 mt-0.5 rounded-full bg-yellow-100 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Career growth opportunities are below industry benchmarks by 8%
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 h-5 w-5 mt-0.5 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Management pulse scores have shown consistent improvement over the last 6 months
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 h-5 w-5 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Work environment scores are 15% above industry average
                          </span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardUI;
