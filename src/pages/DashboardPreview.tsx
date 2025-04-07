import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, ChevronDown, LayoutDashboard, BarChart as BarChartIcon, Users, MessageSquare, Calendar, Settings, User, FileText, BellRing, Info, PanelLeft, TrendingUp, TrendingDown } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import OnboardingState from "@/components/OnboardingState";
import OnboardingForm, { OnboardingFormData } from "@/components/OnboardingForm";

// Sample data for charts
const pulseScoreData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 70 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 85 },
  { month: 'Jul', score: 83 },
  { month: 'Aug', score: 86 },
];

// Updated engagement data with properly formatted labels
const engagementData = [
  { name: 'Highly Engaged', value: 35, color: '#4ade80' },
  { name: 'Engaged', value: 40, color: '#a3e635' },
  { name: 'Neutral', value: 15, color: '#facc15' },
  { name: 'Disengaged', value: 10, color: '#f87171' },
];

const departmentData = [
  { department: 'Engineering', score: 84 },
  { department: 'Marketing', score: 79 },
  { department: 'Sales', score: 75 },
  { department: 'Support', score: 81 },
  { department: 'Operations', score: 77 },
];

const retentionData = [
  { month: 'Jan', actual: 95, benchmark: 92 },
  { month: 'Feb', actual: 94, benchmark: 92 },
  { month: 'Mar', actual: 96, benchmark: 93 },
  { month: 'Apr', actual: 97, benchmark: 93 },
  { month: 'May', actual: 98, benchmark: 93 },
  { month: 'Jun', actual: 97, benchmark: 94 },
  { month: 'Jul', actual: 98, benchmark: 94 },
  { month: 'Aug', actual: 99, benchmark: 94 },
];

// Sample insights data
const insights = [
  {
    title: "Recognition opportunity in Engineering",
    description: "Engineer sentiment around recognition is 24% lower than company average. Consider implementing structured peer recognition program.",
    impact: "high",
    type: "action"
  },
  {
    title: "Positive trend in work-life balance",
    description: "Work-life balance satisfaction has increased 18% over the last quarter across all departments.",
    impact: "medium",
    type: "highlight"
  },
  {
    title: "New hire engagement risk",
    description: "Employees with <6 months tenure show 15% lower engagement. Review onboarding process.",
    impact: "high",
    type: "risk"
  },
  {
    title: "Management effectiveness improving",
    description: "Trust in leadership scores have increased 12% since implementing monthly town halls.",
    impact: "medium",
    type: "highlight"
  },
];

// Sample activities
const activities = [
  {
    user: "Maria Chen",
    action: "completed pulse survey",
    time: "10 minutes ago",
    department: "Engineering"
  },
  {
    user: "Thomas Wright",
    action: "provided feedback",
    time: "1 hour ago",
    department: "Marketing"
  },
  {
    user: "Sophia Rodriguez",
    action: "acknowledged recognition",
    time: "3 hours ago",
    department: "Sales"
  },
  {
    user: "James Kim",
    action: "completed monthly review",
    time: "Yesterday",
    department: "Support"
  },
];

const Sidebar = () => {
  const { toast } = useToast();
  
  const handleMenuItemClick = (label) => {
    toast({
      title: `${label} Selected`,
      description: `You clicked on the ${label} menu item`,
    });
  };
  
  return (
    <div className="border-r bg-white w-64 min-h-screen hidden md:block">
      <div className="p-6">
        <h2 className="text-lg font-bold flex items-center">
          <span className="bg-pulse-500 text-white p-1 rounded mr-2">P</span>
          PulsePlace Dashboard
        </h2>
      </div>
      <nav className="mt-4">
        <div className="px-3 py-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ANALYTICS</p>
        </div>
        <div className="space-y-1 px-3">
          {[
            { icon: <LayoutDashboard className="h-4 w-4 mr-3" />, label: "Overview", active: true },
            { icon: <BarChartIcon className="h-4 w-4 mr-3" />, label: "Reports" },
            { icon: <TrendingUp className="h-4 w-4 mr-3" />, label: "Trends" },
            { icon: <Users className="h-4 w-4 mr-3" />, label: "Teams" },
          ].map((item, i) => (
            <button 
              key={i} 
              className={`flex w-full items-center px-3 py-2 rounded-md text-sm ${
                item.active ? "bg-pulse-50 text-pulse-700" : "text-gray-700 hover:bg-gray-100"
              } cursor-pointer`}
              onClick={() => handleMenuItemClick(item.label)}
            >
              {item.icon}
              {item.label}
              {item.active && <Badge className="ml-auto bg-pulse-100 text-pulse-700 hover:bg-pulse-200">Active</Badge>}
            </button>
          ))}
        </div>
        
        <div className="mt-6 px-3 py-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MANAGEMENT</p>
        </div>
        <div className="space-y-1 px-3">
          {[
            { icon: <MessageSquare className="h-4 w-4 mr-3" />, label: "Feedback" },
            { icon: <Calendar className="h-4 w-4 mr-3" />, label: "Surveys" },
            { icon: <FileText className="h-4 w-4 mr-3" />, label: "Documentation" },
            { icon: <Settings className="h-4 w-4 mr-3" />, label: "Settings" },
          ].map((item, i) => (
            <button 
              key={i} 
              className="flex w-full items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuItemClick(item.label)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

const Header = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "New Notifications",
      description: "You have 3 unread notifications",
    });
  };

  const handleSidebarToggle = () => {
    toast({
      title: "Sidebar Toggle",
      description: "This would toggle the sidebar visibility on mobile",
    });
  };
  
  const handleProfileClick = () => {
    toast({
      title: "User Profile",
      description: "This would open your profile settings",
    });
  };
  
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={handleSidebarToggle}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <span className="ml-2 font-bold">Dashboard</span>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleNotificationClick}
          >
            <BellRing className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
          </Button>
          
          <div className="flex items-center ml-4 cursor-pointer" onClick={handleProfileClick}>
            <div className="w-8 h-8 rounded-full bg-pulse-100 flex items-center justify-center text-pulse-600">
              <User className="h-5 w-5" />
            </div>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-gray-500">HR Director</p>
            </div>
            <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

const OnboardingDemo = () => {
  const { toast } = useToast();
  const [currentState, setCurrentState] = useState('welcome');
  
  const handleButtonClick = () => {
    if (currentState === 'welcome') {
      setCurrentState('form');
    } else if (currentState === 'emptyDashboard') {
      setCurrentState('surveyThanks');
      
      // Simulate survey processing
      setTimeout(() => {
        setCurrentState('scoreLive');
      }, 3000);
    } else if (currentState === 'scoreLive') {
      toast({
        title: "Benchmarks",
        description: "Viewing industry benchmarks..."
      });
    }
  };
  
  const handleFormSubmit = (data: OnboardingFormData) => {
    console.log("Form submitted:", data);
    setCurrentState('surveyThanks');
    
    // Simulate survey processing
    setTimeout(() => {
      setCurrentState('scoreLive');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto my-12">
      {currentState === 'welcome' && (
        <OnboardingState stateType="welcome" onButtonClick={handleButtonClick} />
      )}
      
      {currentState === 'form' && (
        <OnboardingForm onFormSubmit={handleFormSubmit} />
      )}
      
      {currentState === 'emptyDashboard' && (
        <OnboardingState stateType="emptyDashboard" onButtonClick={handleButtonClick} />
      )}
      
      {currentState === 'surveyThanks' && (
        <OnboardingState stateType="surveyThanks" />
      )}
      
      {currentState === 'scoreLive' && (
        <OnboardingState stateType="scoreLive" onButtonClick={handleButtonClick} />
      )}
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">Demo Controls (Not visible in actual product)</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={() => setCurrentState('welcome')}>
            Welcome State
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('form')}>
            Onboarding Form
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('emptyDashboard')}>
            Empty Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('surveyThanks')}>
            Post-Survey
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentState('scoreLive')}>
            Score Live
          </Button>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const { toast } = useToast();
  
  const handleExportClick = () => {
    toast({
      title: "Report Exported",
      description: "Dashboard report has been exported to PDF",
    });
  };
  
  const handleScheduleClick = () => {
    toast({
      title: "Meeting Scheduled",
      description: "A calendar invite has been sent to your email",
    });
  };
  
  const handleViewDetail = () => {
    toast({
      description: "Insight details would open in a full view",
    });
  };
  
  return (
    <div className="p-6 bg-gray-50 flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500">Pulse insights for August 2025</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="text-sm" onClick={handleExportClick}>
            Export Report
          </Button>
          <Button className="bg-pulse-gradient text-sm" onClick={handleScheduleClick}>
            Schedule Meeting
          </Button>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">PulseScore™</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold">86</h3>
                <Badge className="ml-2 bg-green-100 text-green-700">+3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Engagement Rate</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold">92%</h3>
                <Badge className="ml-2 bg-green-100 text-green-700">+5%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Response Rate</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold">88%</h3>
                <Badge className="ml-2 bg-green-100 text-green-700">+2%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Retention Rate</p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold">95%</h3>
                <Badge className="ml-2 bg-green-100 text-green-700">+1%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">PulseScore™ Trend</CardTitle>
            <CardDescription>8-month score evolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pulseScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#9333ea" fill="#e9d5ff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Department Comparison</CardTitle>
            <CardDescription>PulseScore™ by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[60, 100]} />
                  <YAxis dataKey="department" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Engagement Distribution</CardTitle>
            <CardDescription>Employee engagement levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    labelLine={true}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    formatter={(value) => <span style={{ color: '#333', fontSize: '12px' }}>{value}</span>}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Insights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              AI Insights
              <Info className="h-4 w-4 ml-2 text-gray-400" />
            </CardTitle>
            <CardDescription>Generated from your latest data</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <ScrollArea className="h-64 pr-6">
              <div className="space-y-3 px-6">
                {insights.map((insight, i) => {
                  const bgColor = insight.type === 'action' 
                    ? 'bg-blue-50 border-blue-200' 
                    : insight.type === 'risk' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200';
                  
                  const iconColor = insight.type === 'action' 
                    ? 'text-blue-600 bg-blue-100' 
                    : insight.type === 'risk' 
                      ? 'text-red-600 bg-red-100' 
                      : 'text-green-600 bg-green-100';
                  
                  const icon = insight.type === 'action' 
                    ? <Info className="h-4 w-4" /> 
                    : insight.type === 'risk' 
                      ? <AlertCircle className="h-4 w-4" /> 
                      : <Check className="h-4 w-4" />;
                  
                  return (
                    <div key={i} className={`p-3 rounded-md border ${bgColor}`}>
                      <div className="flex items-start">
                        <div className={`p-1 rounded-full ${iconColor} mr-2 mt-0.5`}>
                          {icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{insight.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <Badge className={insight.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}>
                          {insight.impact} impact
                        </Badge>
                        <Button 
                          variant="ghost" 
                          className="text-xs h-6 px-2"
                          onClick={handleViewDetail}
                        >
                          View Detail
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest platform interactions</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <ScrollArea className="h-64">
              <div className="space-y-0">
                {activities.map((activity, i) => (
                  <div key={i} className="py-3 px-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">
                          {activity.user} <span className="font-normal text-gray-500">{activity.action}</span>
                        </p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.department}
                      </Badge>
                    </div>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardPreview = () => {
  const { toast } = useToast();
  const [showDemo, setShowDemo] = useState(true);
  
  const handleRequestDemo = () => {
    toast({
      title: "Demo Request Sent",
      description: "Our team will contact you shortly to schedule a full demo",
    });
  };
  
  const handleViewPricing = () => {
    toast({
      description: "Redirecting to pricing page",
    });
  };
  
  const toggleDemo = () => {
    setShowDemo(!showDemo);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-pulse-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PulsePlace Dashboard Preview
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the insights and analytics that will transform your workplace culture.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link to="/join-beta">
                <Button size="lg" className="bg-pulse-gradient hover:opacity-90" onClick={handleRequestDemo}>
                  Request Full Demo
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50" onClick={handleViewPricing}>
                  View Pricing
                </Button>
              </Link>
            </div>
            
            <div className="max-w-md mx-auto">
              <Button 
                variant="outline" 
                onClick={toggleDemo} 
                className="border-pulse-300 text-pulse-700 hover:bg-pulse-50"
              >
                {showDemo ? "Show Dashboard UI" : "Show Onboarding Flow"}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {showDemo ? (
              <OnboardingDemo />
            ) : (
              <Card className="overflow-hidden border-2 border-gray-200 shadow-xl">
                <div className="flex flex-col md:flex-row">
                  <Sidebar />
                  <div className="flex flex-col flex-grow">
                    <Header />
                    <DashboardOverview />
                  </div>
                </div>
              </Card>
            )}
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Experience the Full Dashboard</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                This is just a preview. The full dashboard includes advanced analytics, 
                customizable reports, and personalized AI recommendations.
              </p>
              <Link to="/join-beta">
                <Button className="bg-pulse-gradient" onClick={handleRequestDemo}>
                  Schedule a Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Dashboard Features</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                    <BarChartIcon className="h-6 w-6 text-pulse-600" />
                  </div>
                  <CardTitle>Real-time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Track culture metrics in real-time with automatic data collection and visualization.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-pulse-600" />
                  </div>
                  <CardTitle>Feedback Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Capture and analyze employee feedback from multiple channels in one central location.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-pulse-600" />
                  </div>
                  <CardTitle>AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive actionable recommendations based on your specific culture data and industry benchmarks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Workplace?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join forward-thinking organizations using data to build better workplace cultures.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-pulse-gradient hover:opacity-90" onClick={handleViewPricing}>
                  View Pricing Plans
                </Button>
              </Link>
              <Link to="/join-beta">
                <Button size="lg" variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50" onClick={handleRequestDemo}>
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPreview;
