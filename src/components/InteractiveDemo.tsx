
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, ChartBar, Award, Brain, BarChart, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const InteractiveDemo = () => {
  const [demoStep, setDemoStep] = useState(1);
  const maxSteps = 3;

  const handleNextStep = () => {
    if (demoStep < maxSteps) {
      setDemoStep(demoStep + 1);
    } else {
      setDemoStep(1); // Reset to first step
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">See PulsePlace.ai in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience how our platform transforms workplace culture data into actionable insights.
          </p>
        </div>

        <Tabs defaultValue="pulse-score" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="pulse-score" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>PulseScore™</span>
            </TabsTrigger>
            <TabsTrigger value="culture-compass" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Culture Compass™</span>
            </TabsTrigger>
            <TabsTrigger value="certification" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Certification</span>
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>AI Insights</span>
            </TabsTrigger>
          </TabsList>

          {/* PulseScore Demo Content */}
          <TabsContent value="pulse-score">
            <Card className="border-2 border-pulse-100">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-pulse-700">PulseScore™ Demo</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Step {demoStep} of {maxSteps}</span>
                      <Progress value={(demoStep / maxSteps) * 100} className="w-24 h-2" />
                    </div>
                  </div>

                  {demoStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <h4 className="text-xl font-medium">Collect Real-Time Feedback</h4>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium mb-3">Sample Pulse Survey</h5>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">How would you rate your overall experience at work this week?</p>
                                <div className="flex space-x-2">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <button 
                                      key={rating} 
                                      className={`w-10 h-10 rounded-full flex items-center justify-center ${rating === 4 ? 'bg-pulse-500 text-white' : 'bg-gray-200'}`}
                                    >
                                      {rating}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">What's one thing your team did well this week?</p>
                                <div className="bg-white p-3 rounded border border-gray-300 text-sm text-gray-700">
                                  Our team collaborated effectively on the new product feature and completed it ahead of schedule.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <h5 className="font-medium mb-3">Key Benefits</h5>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                  <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-sm">Anonymous employee feedback</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                  <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-sm">Quick 2-minute weekly surveys</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="bg-pulse-100 rounded-full p-1 mt-1">
                                  <svg className="h-3 w-3 text-pulse-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-sm">Real-time sentiment tracking</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {demoStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <h4 className="text-xl font-medium">AI Analysis & Processing</h4>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-medium mb-3">Sentiment Analysis</h5>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <div className="mb-3">
                                <div className="text-sm font-medium mb-1">Team Cohesion</div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-pulse-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>0</span>
                                  <span>100</span>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="text-sm font-medium mb-1">Management Support</div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>0</span>
                                  <span>100</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Work-Life Balance</div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>0</span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h5 className="font-medium mb-3">Theme Extraction</h5>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                  <div className="bg-pulse-100 rounded-full p-1 mt-1 shrink-0">
                                    <BarChart className="h-3 w-3 text-pulse-600" />
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Collaboration</span>
                                    <p className="text-xs text-gray-600">Team members value cross-functional project work</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="bg-teal-100 rounded-full p-1 mt-1 shrink-0">
                                    <BarChart className="h-3 w-3 text-teal-600" />
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Efficiency</span>
                                    <p className="text-xs text-gray-600">Projects are being completed ahead of schedule</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="bg-orange-100 rounded-full p-1 mt-1 shrink-0">
                                    <BarChart className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Work Hours</span>
                                    <p className="text-xs text-gray-600">Some concerns about overtime expectations</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {demoStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <h4 className="text-xl font-medium">Your PulseScore™ Dashboard</h4>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-1 md:col-span-2">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="font-medium">Overall PulseScore™</h5>
                                <span className="text-sm text-gray-500">Last updated: Today</span>
                              </div>
                              <div className="flex items-center justify-center py-8">
                                <div className="relative w-40 h-40">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-4xl font-bold text-pulse-600">78</div>
                                  </div>
                                  <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="45"
                                      fill="none"
                                      stroke="#f0f0f0"
                                      strokeWidth="10"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="45"
                                      fill="none"
                                      stroke="#9b87f5"
                                      strokeWidth="10"
                                      strokeDasharray="283"
                                      strokeDashoffset="62"
                                      transform="rotate(-90 50 50)"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="text-center mt-2">
                                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                                  Growth Culture
                                </span>
                                <p className="text-sm text-gray-600 mt-2">
                                  Your organization shows strong momentum with clear improvement trajectory
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                              <h5 className="font-medium mb-4">Key Indicators</h5>
                              <ul className="space-y-3">
                                <li className="flex justify-between items-center">
                                  <span className="text-sm">Emotion Index</span>
                                  <span className="text-sm font-medium">82/100</span>
                                </li>
                                <li className="flex justify-between items-center">
                                  <span className="text-sm">Engagement Stability</span>
                                  <span className="text-sm font-medium">76/100</span>
                                </li>
                                <li className="flex justify-between items-center">
                                  <span className="text-sm">Culture Trust Score</span>
                                  <span className="text-sm font-medium">75/100</span>
                                </li>
                                <li className="flex justify-between items-center">
                                  <span className="text-sm">Industry Rank</span>
                                  <span className="text-sm font-medium">Top 22%</span>
                                </li>
                              </ul>
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h6 className="text-sm font-medium mb-2">Next Steps</h6>
                                <p className="text-xs text-gray-600">Focus on work-life balance to improve your overall score</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNextStep} 
                      className="bg-pulse-gradient hover:opacity-90"
                    >
                      {demoStep < maxSteps ? 'Next Step' : 'Restart Demo'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Culture Compass Demo Content */}
          <TabsContent value="culture-compass">
            <Card className="border-2 border-teal-100">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-teal-700 mb-4">Benchmark Your Culture</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Industry Comparison</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Employee Growth</span>
                              <span className="text-sm text-teal-700">84%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Industry avg: 72%</span>
                              <span className="text-teal-700">+12%</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Flexibility</span>
                              <span className="text-sm text-teal-700">77%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '77%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Industry avg: 68%</span>
                              <span className="text-teal-700">+9%</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Inclusion</span>
                              <span className="text-sm text-orange-700">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Industry avg: 70%</span>
                              <span className="text-orange-700">-5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-4">Insights</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-teal-700">Growth Opportunities</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Your organization excels at providing career growth paths and professional development compared to industry peers.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-teal-700">Work Flexibility</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Your flexible work policies are above industry average, contributing to better work-life balance.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-orange-700">Diversity & Inclusion</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Opportunity to strengthen inclusion initiatives to match or exceed industry benchmarks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    View Detailed Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certification Demo Content */}
          <TabsContent value="certification">
            <Card className="border-2 border-pulse-100">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-pulse-700 mb-4">Pulse Certification Journey</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-medium mb-4">Certification Process</h4>
                      <div className="relative pl-8 pb-8 space-y-8">
                        <div className="absolute top-0 left-3 h-full w-px bg-gray-300"></div>
                        <div className="relative">
                          <div className="absolute -left-8 w-6 h-6 bg-pulse-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <h5 className="text-sm font-medium">Initiate PulseScore™ Analysis</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Connect your HRIS system or distribute anonymous surveys to gather employee sentiment data.
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 w-6 h-6 bg-pulse-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <h5 className="text-sm font-medium">Complete Culture Benchmarking</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Compare your metrics against industry standards and identify areas for improvement.
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 w-6 h-6 bg-pulse-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <h5 className="text-sm font-medium">Implement Recommended Actions</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Apply AI-generated recommendations to improve your workplace culture metrics.
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 w-6 h-6 bg-pulse-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">4</span>
                          </div>
                          <h5 className="text-sm font-medium">Achieve Certification</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            Organizations scoring 85+ receive official Pulse Certification and digital badges.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/3">
                      <h4 className="text-lg font-medium mb-4">Certification Benefits</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <Award className="h-3 w-3 text-pulse-600" />
                            </div>
                            <span className="text-sm">Digital certification badge for your website</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <Users className="h-3 w-3 text-pulse-600" />
                            </div>
                            <span className="text-sm">Featured in "Best Places to Work" rankings</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <Award className="h-3 w-3 text-pulse-600" />
                            </div>
                            <span className="text-sm">Enhanced employer branding for recruitment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-pulse-100 rounded-full p-1 mt-1">
                              <Award className="h-3 w-3 text-pulse-600" />
                            </div>
                            <span className="text-sm">Recognition based on real data, not testimonials</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-pulse-gradient hover:opacity-90">
                    Start Certification Process
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Demo Content */}
          <TabsContent value="ai-insights">
            <Card className="border-2 border-pulse-100">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-pulse-700 mb-4">AI Insights Engine</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Culture Analysis</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                        <div>
                          <h5 className="text-sm font-medium">Key Themes Identified</h5>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-pulse-100 p-2 rounded-full">
                                <Brain className="h-4 w-4 text-pulse-600" />
                              </div>
                              <div>
                                <span className="text-sm font-medium">Team Communication</span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-pulse-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-teal-100 p-2 rounded-full">
                                <Brain className="h-4 w-4 text-teal-600" />
                              </div>
                              <div>
                                <span className="text-sm font-medium">Management Support</span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-orange-100 p-2 rounded-full">
                                <Brain className="h-4 w-4 text-orange-600" />
                              </div>
                              <div>
                                <span className="text-sm font-medium">Work-Life Balance</span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-4">Personalized Action Plan</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="space-y-4">
                          <div className="bg-pulse-50 p-3 rounded-lg border border-pulse-100">
                            <h5 className="text-sm font-medium text-pulse-700">Priority: Work-Life Balance</h5>
                            <p className="text-xs text-gray-600 mt-1">
                              Our AI has identified this as your most critical area for improvement.
                            </p>
                            <div className="mt-2 pt-2 border-t border-pulse-100">
                              <h6 className="text-xs font-medium text-pulse-700">Suggested Actions:</h6>
                              <ul className="mt-1 space-y-1">
                                <li className="text-xs flex items-start gap-1">
                                  <span>•</span>
                                  <span>Implement "No Meeting Fridays" to provide focused work time</span>
                                </li>
                                <li className="text-xs flex items-start gap-1">
                                  <span>•</span>
                                  <span>Review after-hours communication expectations</span>
                                </li>
                                <li className="text-xs flex items-start gap-1">
                                  <span>•</span>
                                  <span>Conduct workload assessment for teams reporting overtime issues</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                            <h5 className="text-sm font-medium text-teal-700">Strength: Team Collaboration</h5>
                            <p className="text-xs text-gray-600 mt-1">
                              This is a strong positive theme in your culture data.
                            </p>
                            <div className="mt-2 pt-2 border-t border-teal-100">
                              <h6 className="text-xs font-medium text-teal-700">Suggested Actions:</h6>
                              <ul className="mt-1 space-y-1">
                                <li className="text-xs flex items-start gap-1">
                                  <span>•</span>
                                  <span>Document successful collaboration practices to share organization-wide</span>
                                </li>
                                <li className="text-xs flex items-start gap-1">
                                  <span>•</span>
                                  <span>Create peer recognition program for outstanding team players</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-pulse-gradient hover:opacity-90">
                    Generate Full Action Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InteractiveDemo;
