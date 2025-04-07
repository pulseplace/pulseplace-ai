
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
              
              {/* PulseScore Certification Status */}
              <Card className="bg-gradient-to-r from-pulse-50 to-white border border-pulse-200">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <CardTitle className="text-xl">PulseScore™ Certification Status</CardTitle>
                    <Badge className="bg-green-100 text-green-800 text-sm mt-2 md:mt-0">Pulse Certified™</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Overall Score</div>
                      <div className="text-2xl font-bold text-green-600">86/100</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Emotion Index</div>
                      <div className="text-2xl font-bold text-blue-600">82/100</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Engagement Stability</div>
                      <div className="text-2xl font-bold text-purple-600">88/100</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Culture Trust</div>
                      <div className="text-2xl font-bold text-teal-600">85/100</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Certification Summary</h4>
                    <p className="text-gray-600 text-sm">
                      Your organization meets all requirements for PulsePlace Certification. Your scores exceed the minimum threshold of 85 overall and 75 for each category. Your organization is now eligible to display the Pulse Certified™ badge on your careers page and recruitment materials.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
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
