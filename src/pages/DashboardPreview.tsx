
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardFeatures from '@/components/dashboard/DashboardFeatures';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, MessageSquare, TrendingUp, Users, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const DashboardPreview = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Dashboard Preview | PulsePlace.ai"
        description="Preview the PulsePlace.ai dashboard and discover how our AI-powered tools can transform your workplace culture"
      />
      <Navbar />
      
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-pulse-50 to-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Preview Our HR Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Get a sneak peek at the powerful tools, analytics, and insights available in the PulsePlace.ai dashboard.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="bg-pulse-gradient p-4 text-white">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 font-mono text-sm">PulsePlace.ai Dashboard</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Overview</h2>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button className="bg-pulse-gradient" size="sm">
                    Export Report
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-pulse-100 p-2 rounded-full mr-4">
                        <BarChart2 className="h-6 w-6 text-pulse-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Pulse Score</h3>
                        <p className="text-3xl font-bold text-pulse-600">82/100</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-pulse-gradient h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">+12% from last quarter</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-teal-100 p-2 rounded-full mr-4">
                        <MessageSquare className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Survey Responses</h3>
                        <p className="text-3xl font-bold text-teal-600">187</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">75% completion rate</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Team Sentiment</h3>
                        <p className="text-3xl font-bold text-purple-600">Positive</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-green-400 mx-auto"></div>
                        <p className="text-xs mt-1">65%</p>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 mx-auto"></div>
                        <p className="text-xs mt-1">25%</p>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-red-400 mx-auto"></div>
                        <p className="text-xs mt-1">10%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border border-gray-200 mb-8">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Culture Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Strong leadership trust</h4>
                        <p className="text-sm text-gray-600">Employees consistently rate leadership communication highly</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Excellent work-life balance</h4>
                        <p className="text-sm text-gray-600">Teams report high satisfaction with flexibility policies</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-yellow-500 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Growth opportunities</h4>
                        <p className="text-sm text-gray-600">Scores improving but still room for enhancement</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-yellow-500 mt-1 mr-2" />
                      <div>
                        <h4 className="font-medium">Recognition programs</h4>
                        <p className="text-sm text-gray-600">AI suggests implementing more frequent peer recognition</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <p className="text-gray-500 mb-4">This is a preview of the PulsePlace.ai dashboard. The actual dashboard includes more advanced features and real-time data visualization.</p>
                <Link to="/join-beta">
                  <Button className="bg-pulse-gradient">
                    Get Early Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <DashboardFeatures />
      
      <Footer />
    </div>
  );
};

export default DashboardPreview;
