import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight, CheckCircle, Clock, Copy, Mail, BarChart3, Upload, UserPlus, Users, Brain, Activity, ChartBar, Award, Target, HeartHandshake, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [teamSize, setTeamSize] = useState(10);
  const [teamEmails, setTeamEmails] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteComplete, setInviteComplete] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const handleInviteTeam = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    
    setTimeout(() => {
      setIsInviting(false);
      setInviteComplete(true);
      toast({
        title: "Team invited successfully",
        description: "Your team members will receive an email with instructions.",
      });
      setTimeout(() => setActiveTab('collect'), 1000);
    }, 1500);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText('https://app.pulseplace.ai/join/demo-company-xyz');
    toast({
      title: "Invite link copied",
      description: "You can now share this link with your team.",
    });
  };

  const handleDemoComplete = () => {
    toast({
      title: "Demo completed!",
      description: "Your PulseScore report is now available.",
    });
    setActiveTab('results');
  };

  const mockEmployees = [
    { id: 1, name: 'Alex Chen', role: 'Engineering', completed: true, score: 78 },
    { id: 2, name: 'Jordan Taylor', role: 'Product', completed: true, score: 85 },
    { id: 3, name: 'Sam Rodriguez', role: 'Design', completed: true, score: 72 },
    { id: 4, name: 'Taylor Kim', role: 'Marketing', completed: true, score: 81 },
    { id: 5, name: 'Jamie Lee', role: 'HR', completed: true, score: 76 },
    { id: 6, name: 'Morgan Smith', role: 'Sales', completed: true, score: 79 },
    { id: 7, name: 'Casey Johnson', role: 'Customer Success', completed: false, score: 0 },
    { id: 8, name: 'Riley Brown', role: 'Engineering', completed: false, score: 0 },
    { id: 9, name: 'Quinn Wilson', role: 'Product', completed: false, score: 0 },
    { id: 10, name: 'Avery Martin', role: 'Finance', completed: false, score: 0 },
  ];

  const completedCount = mockEmployees.filter(e => e.completed).length;
  const completionRate = (completedCount / teamSize) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-pulse-100 text-pulse-800 hover:bg-pulse-200">10-Person Team Pilot</Badge>
              <h1 className="text-4xl font-bold mb-4">Experience PulsePlace.ai in Action</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Walk through a complete pilot flow for a team of 10 — from setup to insights in minutes.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Core Features</h2>
              
              <Card className="mb-10" id="pulse-score">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="bg-pulse-100 p-4 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <Activity className="h-8 w-8 text-pulse-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-pulse-700">PulseScore™</h3>
                      <p className="text-gray-700 mb-4">
                        Our proprietary culture measurement system that generates a real-time score based on sentiment analysis, retention metrics, and employee engagement data.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>AI-powered sentiment analysis of employee feedback</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Real-time updates based on continuous feedback</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Weighted scoring system for accurate culture measurement</span>
                        </li>
                      </ul>
                      <Button className="bg-pulse-gradient">
                        Try PulseScore Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="relative bg-gray-50 p-6 rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4">
                          <div className="w-full h-full rounded-full flex items-center justify-center text-4xl font-bold bg-white border-8 border-pulse-500">
                            78
                          </div>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Your PulseScore</h4>
                        <Badge className="bg-blue-100 text-blue-800 mb-4">Growth Culture – Building Excellence</Badge>
                        <div className="w-full space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Emotion & Trust (40%)</span>
                              <span className="font-semibold">82/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-pulse-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Engagement (30%)</span>
                              <span className="font-semibold">75/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Culture Trust (30%)</span>
                              <span className="font-semibold">73/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-10" id="culture-compass">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 relative bg-gray-50 p-6 rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="bg-teal-100 p-4 rounded-full mb-4">
                          <ChartBar className="h-8 w-8 text-teal-600" />
                        </div>
                        <h4 className="text-xl font-semibold mb-4">Industry Benchmarking</h4>
                        <div className="w-full grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-gray-600 text-sm mb-1">Your Score</p>
                            <p className="text-2xl font-bold text-pulse-600">78</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-gray-600 text-sm mb-1">Industry Avg</p>
                            <p className="text-2xl font-bold">72</p>
                          </div>
                        </div>
                        <div className="w-full space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Growth Opportunities</span>
                              <span className="font-semibold">+12%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Flexibility</span>
                              <span className="font-semibold">+8%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Inclusivity</span>
                              <span className="font-semibold">-3%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '47%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <div className="bg-teal-100 p-4 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <ChartBar className="h-8 w-8 text-teal-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-teal-700">Culture Compass™</h3>
                      <p className="text-gray-700 mb-4">
                        Compare your organizational culture metrics against industry benchmarks to identify strengths and improvement areas.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Benchmark against similar companies in your industry</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Track progress across key culture dimensions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Identify industry-specific cultural strengths and gaps</span>
                        </li>
                      </ul>
                      <Button className="bg-teal-gradient">
                        View Industry Benchmarks <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-10" id="pulse-certified">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="bg-pulse-100 p-4 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <Award className="h-8 w-8 text-pulse-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-pulse-700">Pulse Certified</h3>
                      <p className="text-gray-700 mb-4">
                        A transparent recognition program backed by real-time data, not testimonials or one-time surveys. Showcase your workplace excellence to the world.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Digital badges for social media and career sites</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Quarterly validation to ensure ongoing excellence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Public listing in the Pulse Certified directory</span>
                        </li>
                      </ul>
                      <Button className="bg-pulse-gradient">
                        Learn About Certification <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-white p-8 rounded-full inline-flex items-center justify-center mb-4 border-4 border-pulse-500">
                          <Award className="h-16 w-16 text-pulse-600" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Pulse Certified 2025</h4>
                        <Badge className="bg-pulse-100 text-pulse-800 mb-4">Lovable Workplace</Badge>
                        <p className="text-gray-600 text-sm">
                          Companies that maintain a PulseScore of 85+ for two consecutive quarters earn Pulse Certified status
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <Badge variant="outline" className="bg-pulse-50">Transparent</Badge>
                          <Badge variant="outline" className="bg-pulse-50">Data-Driven</Badge>
                          <Badge variant="outline" className="bg-pulse-50">Verified</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-10" id="ai-insights">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 bg-gray-50 p-6 rounded-lg">
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex gap-3 mb-2">
                            <Brain className="h-6 w-6 text-pulse-600" />
                            <h4 className="font-semibold">Career Development Insight</h4>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Implement personalized growth plans and quarterly career conversations to address the lack of clear progression paths.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex gap-3 mb-2">
                            <Brain className="h-6 w-6 text-teal-600" />
                            <h4 className="font-semibold">Cross-Department Collaboration</h4>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Create bi-weekly cross-functional meetings and a shared digital workspace to improve collaboration between departments.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex gap-3 mb-2">
                            <Lightbulb className="h-6 w-6 text-amber-600" />
                            <h4 className="font-semibold">Employee Recognition</h4>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Develop a structured peer recognition program with monthly awards to increase engagement and satisfaction.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <div className="bg-teal-100 p-4 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                        <Brain className="h-8 w-8 text-teal-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-teal-700">AI Insights Engine</h3>
                      <p className="text-gray-700 mb-4">
                        Our AI analyzes thousands of data points to generate personalized action plans specific to your organization's culture needs.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Trained on data from thousands of companies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Identifies patterns and trends in feedback</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>Generates actionable recommendations with timelines</span>
                        </li>
                      </ul>
                      <Button className="bg-teal-gradient">
                        See AI Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-8">
                <TabsTrigger value="setup">1. Setup</TabsTrigger>
                <TabsTrigger value="collect">2. Collect Feedback</TabsTrigger>
                <TabsTrigger value="analyze">3. AI Analysis</TabsTrigger>
                <TabsTrigger value="results">4. Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="setup" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Set Up Your Pilot</CardTitle>
                    <CardDescription>
                      Invite your team members to participate in a quick PulseScore assessment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleInviteTeam} className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Company or Team Name</label>
                        <Input 
                          placeholder="Your Company Name" 
                          defaultValue="Demo Company" 
                          className="max-w-md"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Team Size</label>
                        <div className="flex items-center gap-2 max-w-xs">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setTeamSize(Math.max(5, teamSize - 1))}
                          >
                            -
                          </Button>
                          <Input 
                            type="number" 
                            value={teamSize} 
                            min={5}
                            max={50}
                            onChange={(e) => setTeamSize(parseInt(e.target.value) || 10)} 
                            className="text-center"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setTeamSize(Math.min(50, teamSize + 1))}
                          >
                            +
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Recommended: 5-50 people for a pilot</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Team Member Emails</label>
                        <Textarea 
                          placeholder="Enter email addresses, one per line"
                          className="h-32"
                          value={teamEmails}
                          onChange={(e) => setTeamEmails(e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          For this demo, you don't need to enter real emails
                        </p>
                      </div>
                      
                      <div className="!mt-8 flex flex-col sm:flex-row gap-4">
                        <Button 
                          type="submit" 
                          className="bg-pulse-gradient" 
                          disabled={isInviting}
                        >
                          {isInviting ? (
                            <>Sending Invites...</>
                          ) : inviteComplete ? (
                            <>Invites Sent <CheckCircle className="ml-2 h-4 w-4" /></>
                          ) : (
                            <>Send Team Invites <Mail className="ml-2 h-4 w-4" /></>
                          )}
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={copyInviteLink}
                        >
                          Copy Invite Link <Copy className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                        onClick={() => setActiveTab('collect')}
                      >
                        <div className="bg-pulse-100 p-2 rounded-full mr-3">
                          <Upload className="h-5 w-5 text-pulse-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Upload Existing Data</div>
                          <div className="text-sm text-gray-500">
                            Use survey data you already have
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                        onClick={() => setActiveTab('results')}
                      >
                        <div className="bg-pulse-100 p-2 rounded-full mr-3">
                          <BarChart3 className="h-5 w-5 text-pulse-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">View Sample Results</div>
                          <div className="text-sm text-gray-500">
                            See what insights you'll get
                          </div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="collect" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Team Response Tracker</CardTitle>
                    <CardDescription>
                      {completedCount} of {teamSize} team members have completed the assessment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span className="font-medium">{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 bg-gray-50 p-3 border-b">
                        <div className="col-span-5 font-medium">Team Member</div>
                        <div className="col-span-3 font-medium">Department</div>
                        <div className="col-span-4 font-medium">Status</div>
                      </div>
                      <div className="divide-y">
                        {mockEmployees.map(employee => (
                          <div key={employee.id} className="grid grid-cols-12 p-3 items-center">
                            <div className="col-span-5 flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{employee.name}</span>
                            </div>
                            <div className="col-span-3 text-gray-600">{employee.role}</div>
                            <div className="col-span-4">
                              {employee.completed ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Completed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" /> Pending
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" onClick={() => setActiveTab('setup')}>
                      Back to Setup
                    </Button>
                    <Button 
                      className="bg-pulse-gradient"
                      onClick={() => setActiveTab('analyze')}
                    >
                      Continue to Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Need More Responses?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                      >
                        <div className="bg-pulse-100 p-2 rounded-full mr-3">
                          <Mail className="h-5 w-5 text-pulse-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Resend Invites</div>
                          <div className="text-sm text-gray-500">
                            Send a reminder to team members
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto py-4"
                      >
                        <div className="bg-pulse-100 p-2 rounded-full mr-3">
                          <UserPlus className="h-5 w-5 text-pulse-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Add Team Members</div>
                          <div className="text-sm text-gray-500">
                            Invite additional participants
                          </div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analyze" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">AI Analysis in Progress</CardTitle>
                    <CardDescription>
                      Our AI is analyzing responses from your team to generate actionable insights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8">
                      <div className="relative flex flex-col items-center">
                        <div className="animate-pulse bg-pulse-100 h-32 w-32 rounded-full flex items-center justify-center mb-6">
                          <div className="animate-spin-slow bg-pulse-gradient h-24 w-24 rounded-full flex items-center justify-center text-white">
                            <Brain className="h-12 w-12" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-medium mb-2">Analyzing Team Feedback</h3>
                        <p className="text-gray-600 text-center max-w-md">
                          This typically takes 60-90 seconds for a team of {teamSize} people.
                        </p>
                        
                        <div className="mt-8 space-y-4 w-full max-w-md">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Processing Survey Responses</span>
                              <span className="font-medium">100%</span>
                            </div>
                            <Progress value={100} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Identifying Key Themes</span>
                              <span className="font-medium">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Generating Insights</span>
                              <span className="font-medium">60%</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Creating Recommendations</span>
                              <span className="font-medium">30%</span>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>
                        </div>

                        <Button 
                          className="mt-12 bg-pulse-gradient" 
                          onClick={handleDemoComplete}
                        >
                          Skip to Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-1">Team PulseScore Results</CardTitle>
                        <CardDescription>
                          Based on feedback from {completedCount} team members
                        </CardDescription>
                      </div>
                      <div className="bg-pulse-gradient text-white h-16 w-16 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold">78</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Score Breakdown</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Emotion & Trust (40%)</span>
                            <span className="font-semibold">82/100</span>
                          </div>
                          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[82%] bg-green-500 rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Engagement Stability (30%)</span>
                            <span className="font-semibold">75/100</span>
                          </div>
                          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[75%] bg-blue-500 rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Culture Trust (30%)</span>
                            <span className="font-semibold">73/100</span>
                          </div>
                          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[73%] bg-teal-500 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Key Strengths</h3>
                        <div className="bg-green-50 p-4 rounded-lg space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                            <span>Strong team collaboration and support</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                            <span>Transparent communication from leadership</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                            <span>Good work-life balance policies</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Areas for Improvement</h3>
                        <div className="bg-amber-50 p-4 rounded-lg space-y-2">
                          <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                            <span>Career development pathways could be clearer</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                            <span>Inter-departmental communication needs improvement</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                            <span>Recognition programs could be more consistent</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Industry Benchmarking</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Your Score</p>
                            <p className="text-2xl font-bold text-pulse-600">78</p>
                          </div>
                          <div className="border-x">
                            <p className="text-sm text-gray-500 mb-1">Industry Average</p>
                            <p className="text-2xl font-bold">72</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Top Quartile</p>
                            <p className="text-2xl font-bold text-teal-600">85+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" onClick={() => setActiveTab('analyze')}>
                      Back to Analysis
                    </Button>
                    
                    <div className="flex gap-3">
                      <Button variant="outline">
                        Download Full Report
                      </Button>
                      <Link to="/join-beta">
                        <Button className="bg-pulse-gradient">
                          Start Your Pilot <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Action Plan</CardTitle>
                    <CardDescription>
                      Personalized recommendations based on your team's feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2 mb-2 text-pulse-700">
                          <Users className="h-5 w-5" /> 
                          <span>Career Development Focus</span>
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Create individualized growth plans for each team member within the next 30 days. 
                          Schedule quarterly career conversations with clear progression milestones.
                        </p>
                      </div>
                      
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2 mb-2 text-pulse-700">
                          <Users className="h-5 w-5" /> 
                          <span>Cross-Department Collaboration</span>
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Implement bi-weekly cross-functional team meetings for project updates 
                          and establish a shared digital workspace for improved information sharing.
                        </p>
                      </div>
                      
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2 mb-2 text-pulse-700">
                          <Users className="h-5 w-5" /> 
                          <span>Recognition System Enhancement</span>
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Develop a structured peer recognition program with monthly awards 
                          and public acknowledgment of achievements across various team contributions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <section className="bg-pulse-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Try This With Your Team?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Get your own personalized PulseScore and AI recommendations in just a few days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join-beta">
              <Button size="lg" className="bg-pulse-gradient">
                Start Your Free Pilot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Book a Demo Call
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Demo;
