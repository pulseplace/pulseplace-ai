
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Shield, BarChart, Zap, BrainCircuit, LineChart, Scale } from 'lucide-react';
import AIDemoComponent from '@/components/AIDemoComponent';

const AIEngine = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How PulsePlace.ai Understands Culture at Scale
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our AI combines LLMs, natural language processing, and benchmarking to turn employee sentiment into strategic insight.
            </p>
          </div>
        </div>
      </div>
      
      {/* AI Core Technologies Section */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core AI Technologies</h2>
            <p className="text-lg text-gray-700">
              Our platform combines multiple AI technologies to deliver comprehensive culture insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-pulse-100 p-2 w-fit rounded-lg mb-2">
                  <BrainCircuit className="h-5 w-5 text-pulse-600" />
                </div>
                <CardTitle>Large Language Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Custom-tuned LLMs analyze free-text responses to identify nuanced themes, sentiment, and actionable insights from employee feedback.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-pulse-100 p-2 w-fit rounded-lg mb-2">
                  <LineChart className="h-5 w-5 text-pulse-600" />
                </div>
                <CardTitle>Pattern Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our models identify recurring patterns across feedback data sets, surfacing hidden trends and culture indicators that might be missed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-pulse-100 p-2 w-fit rounded-lg mb-2">
                  <Scale className="h-5 w-5 text-pulse-600" />
                </div>
                <CardTitle>Adaptive Benchmarking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Continuously updated industry benchmarks allow for accurate comparisons and contextualization of your workplace culture data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Interactive AI Demo Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Our AI in Action</h2>
            <p className="text-lg text-gray-700">
              Try our interactive demo to see how PulsePlace.ai transforms employee feedback into actionable insights.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-sm">
            <AIDemoComponent />
          </div>
        </div>
      </div>
      
      {/* Visual Flow Section */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI Engine</h2>
            <p className="text-lg text-gray-700">
              From unfiltered feedback to PulseScore insights — here's how it works.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto my-12">
            <div className="bg-[#F1F0FB] rounded-xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-pulse-100 p-2 rounded-full mr-3">
                        <Zap className="h-5 w-5 text-pulse-600" />
                      </div>
                      <h3 className="font-semibold">Input Processing</h3>
                    </div>
                    <p className="text-sm text-gray-600">Our sentiment engine processes employee pulse survey responses</p>
                    <div className="flex justify-end mt-4 text-pulse-600">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-pulse-100 p-2 rounded-full mr-3">
                        <BarChart className="h-5 w-5 text-pulse-600" />
                      </div>
                      <h3 className="font-semibold">Theme Extraction</h3>
                    </div>
                    <p className="text-sm text-gray-600">LLMs synthesize feedback into recurring themes and key insights</p>
                    <div className="flex justify-end mt-4 text-pulse-600">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-pulse-100 p-2 rounded-full mr-3">
                        <Shield className="h-5 w-5 text-pulse-600" />
                      </div>
                      <h3 className="font-semibold">Benchmarking</h3>
                    </div>
                    <p className="text-sm text-gray-600">Data is compared against industry and historical trends</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Highlights Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="bg-pulse-100 p-4 rounded-full mb-6">
                <Zap className="h-8 w-8 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">LLM-powered theme detection</h3>
              <p className="text-gray-600">
                Our AI identifies recurring themes in employee feedback without bias, surfacing what matters most to your teams.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="bg-pulse-100 p-4 rounded-full mb-6">
                <BarChart className="h-8 w-8 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sector-wise benchmarking</h3>
              <p className="text-gray-600">
                Compare your culture metrics with industry peers to understand where you stand and how to improve.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="bg-pulse-100 p-4 rounded-full mb-6">
                <Shield className="h-8 w-8 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time dashboards</h3>
              <p className="text-gray-600">
                Track culture trends with actionable insights and improvement nudges delivered directly to decision-makers.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust & Privacy */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ethical by Design</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              All data is encrypted, anonymous, and processed in aggregate. Our models are built with fairness, transparency, and actionable outcomes in mind.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-pulse-600 to-teal-500">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Want a Custom Demo?</h2>
            <Button
              className="bg-white text-pulse-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              onClick={() => window.location.href = 'mailto:certify@pulseplace.ai'}
            >
              Book a Discovery Call <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIEngine;
