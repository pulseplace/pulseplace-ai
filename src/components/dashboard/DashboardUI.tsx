
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import TeamPulseTrends from './TeamPulseTrends';
import SentimentAnalysis from './SentimentAnalysis';
import SkillsGapAnalysis from './SkillsGapAnalysis';
import { CheckCircle2, Download, FileCheck, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const DashboardUI = () => {
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleDownloadBadge = () => {
    toast({
      title: "Badge Downloaded",
      description: "Your certification badge has been downloaded",
    });
  };
  
  const handleViewDetails = () => {
    toast({
      title: "Viewing Details",
      description: "Navigating to detailed certification view",
    });
  };
  
  return (
    <Card className="overflow-hidden border-2 border-gray-200 shadow-xl">
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar isCollapsed={sidebarCollapsed} />
        <div className="flex flex-col flex-grow overflow-y-auto">
          <DashboardHeader />
          <div className="p-6">
            <div className="space-y-6">
              <DashboardOverview />
              
              {/* Enhanced PulseScore Certification Status */}
              <Card className="bg-gradient-to-r from-pulse-50 to-white border border-pulse-200 shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">PulseScore™ Certification Status</CardTitle>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">Pulse Certified™</Badge>
                      <span className="text-xs text-gray-500">Valid until Aug 2026</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                      <div className="text-sm text-gray-500 mb-1">Overall Score</div>
                      <div className="text-2xl font-bold text-green-600">86/100</div>
                      <div className="mt-1 text-xs text-green-600 flex items-center">
                        <span className="inline-block mr-1">▲</span> 4 points from last assessment
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                      <div className="text-sm text-gray-500 mb-1">Emotion Index</div>
                      <div className="text-2xl font-bold text-blue-600">82/100</div>
                      <div className="mt-1 text-xs text-gray-500">40% of total score</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                      <div className="text-sm text-gray-500 mb-1">Engagement Stability</div>
                      <div className="text-2xl font-bold text-purple-600">88/100</div>
                      <div className="mt-1 text-xs text-gray-500">30% of total score</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                      <div className="text-sm text-gray-500 mb-1">Culture Trust</div>
                      <div className="text-2xl font-bold text-teal-600">85/100</div>
                      <div className="mt-1 text-xs text-gray-500">30% of total score</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 col-span-2">
                      <h4 className="font-medium text-gray-900 mb-2">Certification Summary</h4>
                      <p className="text-gray-600 text-sm">
                        Your organization meets all requirements for PulsePlace Certification. Your scores exceed the minimum threshold of 85 overall and 75 for each category. Your organization is now eligible to display the Pulse Certified™ badge on your careers page and recruitment materials.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-3">Certification Actions</h4>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={handleDownloadBadge}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Badge
                        </Button>
                        <Link to="/dashboard/share-certification" className="w-full">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:bg-pulse-50 hover:text-pulse-700 transition-colors"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Certification
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={handleViewDetails}
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                    <p><strong>Next steps:</strong> Generate your embeddable certification badge to display on your website and marketing materials. <Link to="/dashboard/share-certification" className="underline hover:text-blue-700">Share your certification</Link> with stakeholders and customers to highlight your commitment to workplace well-being.</p>
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
