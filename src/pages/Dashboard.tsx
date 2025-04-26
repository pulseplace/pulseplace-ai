
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Users, 
  Bot, 
  Award,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">PulsePlace Dashboard</h1>
        <p className="text-gray-600">
          Monitor your workplace culture health and certification progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Award className="h-5 w-5 mr-2 text-purple-600" />
              Pulse Score™
            </CardTitle>
            <CardDescription>Your certification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">82/100</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">
                Pulse Certified™
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => navigate('/dashboard/certification')}
              >
                View Details
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card onClick={() => navigate('/dashboard/insights')} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
              Insights
            </CardTitle>
            <CardDescription>Culture analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-4">
              View detailed analytics about your workplace culture metrics
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              View Insights
            </Button>
          </CardContent>
        </Card>
        
        <Card onClick={() => navigate('/dashboard/teams')} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Teams
            </CardTitle>
            <CardDescription>Team analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-4">
              Monitor metrics and feedback for individual teams
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              View Teams
            </Button>
          </CardContent>
        </Card>
        
        <Card onClick={() => navigate('/dashboard/pulsebot')} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bot className="h-5 w-5 mr-2 text-amber-600" />
              PulseBot
            </CardTitle>
            <CardDescription>AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-4">
              Get AI-powered insights and recommendations
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              Chat with PulseBot
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Certification Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Complete Workplace Assessment</h3>
                  <p className="text-sm text-gray-600">
                    Gather feedback with the PulseScore survey
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/pulse-score-lite')}>
                  Take Survey
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Receive AI Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Get insights based on your survey results
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/insights')}>
                  View Insights
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Get Certified</h3>
                  <p className="text-sm text-gray-600">
                    Receive your official Pulse Certified™ badge
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/certification')}>
                  View Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>PulseBot Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">
                  "Employee recognition is a key opportunity area based on recent survey responses."
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">
                  "Team collaboration scores have improved 12% since implementing your new meeting structure."
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">
                  "Consider scheduling a team-building event to improve psychological safety scores."
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/dashboard/pulsebot')}
              >
                <Bot className="mr-2 h-4 w-4" />
                Chat with PulseBot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
