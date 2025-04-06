import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SmilePlus, RefreshCw, Users, AlertTriangle, BarChart3, Brain, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const Methodology = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* 1. Page Title */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How PulseScore™ Measures What Matters</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our AI-driven methodology blends employee sentiment, behavioral signals, and culture trust indicators to rank the world's most loved workplaces.
            </p>
          </div>
        </section>

        {/* 2. The PulseScore Framework */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">The PulseScore™ Framework</h2>
              <Separator className="w-24 mx-auto bg-pulse-500/50 h-1 rounded-full my-6" />
              <p className="text-xl text-gray-700 mb-12">3 Core Signals Power the PulseScore</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <SmilePlus className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Emotion Index</h3>
                <p className="text-gray-600">
                  From anonymous employee sentiment via pulse surveys
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <RefreshCw className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Engagement Stability</h3>
                <p className="text-gray-600">
                  Retention trends, absenteeism, internal movement
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <Users className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Culture Trust Score</h3>
                <p className="text-gray-600">
                  DEI data, flexibility, onboarding feedback
                </p>
              </div>
            </div>
            
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-pulse-50 rounded-xl p-6 text-center">
                <p className="text-xl font-medium text-gray-800">
                  PulseScore = 0.4 × Emotion Index + 0.3 × Engagement Index + 0.3 × Culture Trust Score
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 3. Certification Levels */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Certification Levels</h2>
              <Separator className="w-24 mx-auto bg-pulse-500/50 h-1 rounded-full my-6" />
              <p className="text-xl text-gray-700 mb-12">Where does your company stand?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <SmilePlus className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">85–100</h3>
                <h4 className="text-lg font-semibold mb-3">Pulse Certified</h4>
                <p className="text-gray-600">
                  "Lovable Workplace"
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
                <div className="bg-teal-100 p-4 rounded-full mb-6">
                  <BarChart3 className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">70–84</h3>
                <h4 className="text-lg font-semibold mb-3">Growth Culture</h4>
                <p className="text-gray-600">
                  "On the Rise"
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
                <div className="bg-orange-100 p-4 rounded-full mb-6">
                  <AlertTriangle className="h-10 w-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">50–69</h3>
                <h4 className="text-lg font-semibold mb-3">Developing</h4>
                <p className="text-gray-600">
                  "Needs Attention"
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
                <div className="bg-red-100 p-4 rounded-full mb-6">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Below 50</h3>
                <h4 className="text-lg font-semibold mb-3">At Risk</h4>
                <p className="text-gray-600">
                  "Critical Culture Risk"
                </p>
              </div>
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto">
              <img 
                src="/lovable-uploads/802f6b9e-42e3-4397-ba07-c035bd53a988.png" 
                alt="PulsePlace.ai Methodology Infographic"
                className="w-full h-auto mx-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
        
        {/* 4. How Our AI Works */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">How Our AI Works</h2>
              <Separator className="w-24 mx-auto bg-pulse-500/50 h-1 rounded-full my-6" />
              <p className="text-xl text-gray-700 mb-12">Built With Integrity, Backed by Data</p>
            </div>
            
            <div className="max-w-4xl mx-auto my-8">
              <div className="bg-[#F1F0FB] rounded-xl p-6 md:p-8 shadow-sm">
                <img 
                  src="/lovable-uploads/693f7738-d96d-48e0-8d0f-d09d05c93a98.png" 
                  alt="How Our AI Works: Sentiment engine processes pulse survey text, LLM synthesizes feedback into themes, Benchmarked vs. industry and historical trends" 
                  className="w-full h-auto mx-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <Brain className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sentiment Engine</h3>
                <p className="text-gray-600">
                  Processes pulse survey text with advanced NLP models
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <RefreshCw className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">LLM Analysis</h3>
                <p className="text-gray-600">
                  Summarizes feedback into actionable themes and insights
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 shadow-sm">
                <div className="bg-pulse-100 p-4 rounded-full mb-6">
                  <BarChart3 className="h-10 w-10 text-pulse-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Benchmarking</h3>
                <p className="text-gray-600">
                  Compares results against industry and historical trends
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 5. Privacy & Data Ethics */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-pulse-100 p-4 rounded-full">
                  <Shield className="h-10 w-10 text-pulse-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6">Privacy & Data Ethics</h2>
              <p className="text-lg text-gray-700">
                All responses are anonymous, encrypted, and used only in aggregate form. 
                We believe workplace culture is too important to be gamed or guessed.
              </p>
            </div>
          </div>
        </section>
        
        {/* 6. CTA Section */}
        <section className="w-full py-20 bg-gradient-to-r from-pulse-600 to-pulse-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Pulse Certified?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              We're onboarding forward-thinking companies into our certification beta.
            </p>
            <a href="mailto:certify@pulseplace.ai">
              <Button className="bg-white text-pulse-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-full transition-all hover:shadow-lg group">
                Get Pulse Certified
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Methodology;
