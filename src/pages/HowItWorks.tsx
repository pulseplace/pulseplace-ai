
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart4, Clipboard, Gauge, LineChart, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="How It Works | PulsePlace.ai" 
        description="Learn how PulsePlace.ai measures, analyzes, and improves workplace culture."
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">PulsePlace.ai</span> Works
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                From data collection to certification, our AI-powered platform measures and improves workplace culture with unprecedented accuracy.
              </p>
            </div>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">The PulsePlace Process</h2>
              
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="inline-block bg-pulse-100 text-pulse-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      Step 1
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Data Collection</h3>
                    <p className="text-gray-700 mb-4">
                      We collect workplace culture data through multiple channels:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <MessageCircle className="h-5 w-5 text-pulse-600 mr-2 mt-0.5" />
                        <span>Continuous micro-surveys (daily or weekly pulse checks)</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="h-5 w-5 text-pulse-600 mr-2 mt-0.5" />
                        <span>Team feedback and sentiment analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Clipboard className="h-5 w-5 text-pulse-600 mr-2 mt-0.5" />
                        <span>Organization metrics and KPIs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 bg-gradient-to-br from-pulse-50 to-blue-50 p-8 rounded-xl">
                    <img 
                      src="/lovable-uploads/802f6b9e-42e3-4397-ba07-c035bd53a988.png" 
                      alt="Data Collection" 
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl">
                    <img 
                      src="/lovable-uploads/8ddd4a13-530a-46ac-909c-052283c1315d.png" 
                      alt="AI Analysis" 
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      Step 2
                    </div>
                    <h3 className="text-2xl font-bold mb-4">AI-Powered Analysis</h3>
                    <p className="text-gray-700 mb-4">
                      Our AI engine processes the data to generate actionable insights:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <BarChart4 className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                        <span>Theme detection across employee feedback</span>
                      </li>
                      <li className="flex items-start">
                        <LineChart className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                        <span>Trend analysis and predictive modeling</span>
                      </li>
                      <li className="flex items-start">
                        <Gauge className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                        <span>PulseScore™ calculation and benchmarking</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      Step 3
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Certification & Recognition</h3>
                    <p className="text-gray-700 mb-4">
                      Based on the analysis, organizations receive:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                        <span>Official PulsePlace certification (Bronze, Silver, or Gold)</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                        <span>Digital badges for website and recruitment materials</span>
                      </li>
                      <li className="flex items-start">
                        <BarChart4 className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                        <span>Detailed culture reports and improvement recommendations</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
                    <img 
                      src="/lovable-uploads/693f7738-d96d-48e0-8d0f-d09d05c93a98.png" 
                      alt="Certification" 
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature Comparison */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                PulsePlace vs. Traditional Recognition Programs
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4 text-pulse-600">PulsePlace</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>Continuous real-time measurement</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>AI-powered theme detection</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>Objective data-driven certification</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>Department-level insights</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>Specific improvement recommendations</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="col-span-1">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-600">"Best Places to Work"</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>Annual surveys only</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>Manual review process</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>Well-known brand recognition</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>Organization-wide metrics only</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>Generic recommendations</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="col-span-1">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-600">Traditional Surveys</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>Infrequent measurement</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>Basic sentiment analysis</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">✗</div>
                          <span>No certification or recognition</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                          <span>Team-level insights possible</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-2">~</div>
                          <span>Limited action suggestions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-pulse-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Workplace?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join forward-thinking organizations using PulsePlace.ai to measure, understand, and improve their workplace culture.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/join-beta">
                <Button className="bg-white text-pulse-600 hover:bg-gray-100 transition-colors px-6">
                  Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/certification">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 transition-colors px-6">
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

export default HowItWorks;
