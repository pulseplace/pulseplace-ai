
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart3, BarChart4, BrainCircuit, Lightbulb, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const Insights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Workplace Insights | PulsePlace.ai" 
        description="Discover actionable insights about workplace culture and employee engagement."
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Actionable <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">Workplace Insights</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Our AI-powered platform transforms employee feedback into clear, actionable insights for workplace improvement.
              </p>
              <Link to="/join-beta">
                <Button className="bg-pulse-gradient hover:opacity-90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Insights Platform</h2>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="themes" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="themes">Theme Analysis</TabsTrigger>
                  <TabsTrigger value="trends">Trend Detection</TabsTrigger>
                  <TabsTrigger value="benchmarks">Benchmarking</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="themes">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BrainCircuit className="mr-2 h-5 w-5 text-pulse-600" />
                        Theme Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <p className="mb-4">
                            Our AI engine automatically detects key themes in employee feedback, organizing unstructured data into actionable categories:
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-pulse-600 mr-2">•</div>
                              <span>Trust in leadership</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-pulse-600 mr-2">•</div>
                              <span>Work-life balance</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-pulse-600 mr-2">•</div>
                              <span>Career development</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-pulse-600 mr-2">•</div>
                              <span>Team collaboration</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-pulse-600 mr-2">•</div>
                              <span>Workplace environment</span>
                            </li>
                          </ul>
                          <p>
                            Each theme receives a sentiment score, helping you identify areas of strength and opportunity.
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <img 
                            src="/lovable-uploads/4f3c79fd-71b5-4a9d-9b51-8a7712a973f1.png" 
                            alt="Theme Analysis" 
                            className="w-full rounded-lg"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trends">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-teal-600" />
                        Trend Detection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-gray-50 p-4 rounded-lg order-2 md:order-1">
                          <img 
                            src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                            alt="Trend Detection" 
                            className="w-full rounded-lg"
                          />
                        </div>
                        <div className="order-1 md:order-2">
                          <p className="mb-4">
                            Track sentiment changes over time to identify emerging trends before they become issues:
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-teal-600 mr-2">•</div>
                              <span>Weekly, monthly, and quarterly trend analysis</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-teal-600 mr-2">•</div>
                              <span>Department-specific trend detection</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-teal-600 mr-2">•</div>
                              <span>Early warning system for sentiment shifts</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-teal-600 mr-2">•</div>
                              <span>Correlation analysis between themes</span>
                            </li>
                          </ul>
                          <p>
                            Our predictive analytics help you anticipate future challenges based on historical patterns.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="benchmarks">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart4 className="mr-2 h-5 w-5 text-purple-600" />
                        Industry Benchmarking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <p className="mb-4">
                            Compare your workplace culture metrics against industry peers:
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-purple-600 mr-2">•</div>
                              <span>Industry-specific benchmarks</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-purple-600 mr-2">•</div>
                              <span>Company size comparisons</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-purple-600 mr-2">•</div>
                              <span>Regional and global benchmarks</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-purple-600 mr-2">•</div>
                              <span>High-performer analysis</span>
                            </li>
                          </ul>
                          <p>
                            Understand where you stand and what top-performing organizations are doing differently.
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <img 
                            src="/lovable-uploads/da2df9b1-afa2-4019-be42-cbfdedf8740b.png" 
                            alt="Benchmarking" 
                            className="w-full rounded-lg"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recommendations">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="mr-2 h-5 w-5 text-amber-600" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-gray-50 p-4 rounded-lg order-2 md:order-1">
                          <img 
                            src="/lovable-uploads/802f6b9e-42e3-4397-ba07-c035bd53a988.png" 
                            alt="AI Recommendations" 
                            className="w-full rounded-lg"
                          />
                        </div>
                        <div className="order-1 md:order-2">
                          <p className="mb-4">
                            Receive tailored recommendations based on your specific data:
                          </p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-amber-600 mr-2">•</div>
                              <span>Personalized improvement strategies</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-amber-600 mr-2">•</div>
                              <span>Evidence-based best practices</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-amber-600 mr-2">•</div>
                              <span>Department-specific action items</span>
                            </li>
                            <li className="flex items-start">
                              <div className="h-5 w-5 text-amber-600 mr-2">•</div>
                              <span>ROI calculations for improvement initiatives</span>
                            </li>
                          </ul>
                          <p>
                            Our recommendations are practical, prioritized, and designed for real-world implementation.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Organizations Use Our Insights</h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-pulse-100 rounded-full flex items-center justify-center text-pulse-600 mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Strategic Planning</h3>
                  <p className="text-gray-600">
                    Make data-driven decisions about workplace policies, programs, and initiatives based on real employee feedback.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Employee Experience</h3>
                  <p className="text-gray-600">
                    Identify specific improvements that will most impact employee satisfaction, engagement, and retention.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Competitive Edge</h3>
                  <p className="text-gray-600">
                    Enhance employer branding, talent attraction, and market positioning with certified workplace culture excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-pulse-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Gain Deeper Workplace Insights?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Transform your approach to workplace culture measurement with data-driven insights and AI-powered recommendations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/join-beta">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 px-6">
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/certification">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 px-6">
                  Learn About Certification
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

export default Insights;
