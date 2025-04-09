
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Clock, CreditCard, FileText, Globe, MessageSquare, Smile, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Features | PulsePlace.ai" 
        description="Explore the powerful features of PulsePlace.ai for measuring and improving workplace culture."
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                PulsePlace <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">Features</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Our comprehensive suite of tools helps you measure, understand, and improve your workplace culture.
              </p>
              <Link to="/join-beta">
                <Button className="bg-pulse-gradient hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Core Platform Features</h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <MessageSquare className="h-8 w-8 text-pulse-600" />
                  </div>
                  <CardTitle>Pulse Surveys</CardTitle>
                  <CardDescription>
                    Continuous micro-surveys to gather real-time feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Customizable question templates
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Smart scheduling to prevent survey fatigue
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Anonymous feedback options
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Multiple response formats
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <BarChart className="h-8 w-8 text-pulse-600" />
                  </div>
                  <CardTitle>AI Analytics</CardTitle>
                  <CardDescription>
                    Transform feedback into actionable insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Theme detection and sentiment analysis
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Trend identification and forecasting
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Department and team-level insights
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Industry benchmarking
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <Users className="h-8 w-8 text-pulse-600" />
                  </div>
                  <CardTitle>Certification Engine</CardTitle>
                  <CardDescription>
                    Validate and showcase your workplace culture.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Bronze, Silver, and Gold certification tiers
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Digital badges for your website and marketing
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Certification verification portal
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Annual renewal process
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <Clock className="h-8 w-8 text-pulse-600" />
                  </div>
                  <CardTitle>Real-Time Dashboard</CardTitle>
                  <CardDescription>
                    Monitor your culture metrics as they evolve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Customizable dashboard views
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Interactive data visualization
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Export and sharing capabilities
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Alert system for significant changes
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <Smile className="h-8 w-8 text-pulse-600" />
                  </div>
                  <CardTitle>PulseBot AI</CardTitle>
                  <CardDescription>
                    AI assistant for employee engagement and insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Conversational survey experience
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      On-demand culture resources
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Personalized recommendations
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Anonymous feedback collection
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <FileText className="h-8 w-8 text-pulse-600" />
                  </div>
                  <CardTitle>Custom Reports</CardTitle>
                  <CardDescription>
                    Generate detailed reports for stakeholders.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Executive summaries
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Department-specific reports
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Trend analysis over time
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                      Export to PDF, CSV, and PowerPoint
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Integration Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Seamless Integrations</h2>
            <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Connect PulsePlace with your existing tools and workflows.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <Globe className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">HR Platforms</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Seamlessly connect with major HR software.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Communication Tools</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Integrate with Slack, Teams, and more.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Calendar Apps</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Schedule surveys and reports automatically.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-10 w-10 text-pulse-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">SSO & Identity</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Secure login with your existing provider.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-pulse-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience PulsePlace?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our beta program today and be among the first to transform your workplace culture.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/join-beta">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 transition-colors px-6">
                  Join the Beta
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 transition-colors px-6">
                  Contact Sales
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

export default Features;
