
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, BarChart, Zap } from 'lucide-react';

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
              <img 
                src="/lovable-uploads/693f7738-d96d-48e0-8d0f-d09d05c93a98.png" 
                alt="How Our AI Works: Sentiment engine processes pulse survey text, LLM synthesizes feedback into themes, Benchmarked vs. industry and historical trends" 
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Highlights Section */}
      <div className="py-16 px-4 bg-blue-50">
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
