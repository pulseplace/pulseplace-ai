
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Activity, Brain, Award, ChartBar, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Hero = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to your backend
    console.log('Request submitted:', { name, email, company, message });
    
    toast({
      title: "Beta registration submitted",
      description: "Thank you! We'll be in touch soon with your beta access details.",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your fixed header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const coreFeatures = [
    {
      icon: <Activity className="h-6 w-6 text-white" />,
      name: "PulseScore™",
      description: "Real-time workplace culture rating"
    },
    {
      icon: <ChartBar className="h-6 w-6 text-white" />,
      name: "Culture Compass™",
      description: "Benchmark against industry standards"
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      name: "Pulse Certified",
      description: "Transparent workplace recognition"
    },
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      name: "AI Insights",
      description: "Actionable culture improvement plans"
    }
  ];

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="container mx-auto">
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-pulse-100 text-pulse-700 text-sm font-medium mb-4">
              <span className="mr-1">Redefining workplace excellence</span>
              <div className="w-2 h-2 rounded-full bg-pulse-500 ml-2"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">AI-Powered Rankings</span>
              <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
                for the Most Loved
              </span>
              <span className="block">Workplaces</span>
            </h1>
            
            <p className="text-lg text-gray-600 md:text-xl max-w-xl">
              PulsePlace.ai measures employee sentiment, trust, and culture in real time — and ranks companies who truly walk the talk.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <HashLink to="/#join-beta" scroll={scrollWithOffset}>
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all h-12 px-6 text-base w-full sm:w-auto">
                  Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </HashLink>
              
              <Link to="/demo">
                <Button 
                  variant="outline" 
                  className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base w-full sm:w-auto"
                >
                  Try Team Demo <Users className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/certification">
                <Button 
                  variant="outline" 
                  className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base w-full sm:w-auto"
                >
                  Get Pulse Certified <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-xs bg-pulse-${500 + i * 100}`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Join <span className="font-semibold">250+</span> organizations already using PulsePlace.ai
              </p>
            </div>
          </div>
          
          {/* Updated Hero Visualization - Horizontal Flow */}
          <div className="w-full lg:w-1/2 relative">
            <div className="w-full h-80 md:h-96 lg:h-[500px] relative overflow-hidden rounded-2xl bg-gradient-to-br from-pulse-100 to-pulse-50 shadow-lg">
              {/* Background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400 opacity-20 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pulse-400 opacity-10 rounded-full animate-spin-slow"></div>
              
              {/* Horizontal workflow diagram */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full max-w-lg">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                        <h3 className="font-semibold text-pulse-700">Collect Feedback</h3>
                        <p className="text-sm text-gray-600">AI-powered pulse surveys measure employee sentiment</p>
                      </div>
                    </div>
                    <div className="absolute left-6 top-12 h-10 w-0.5 bg-pulse-300"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                        <h3 className="font-semibold text-pulse-700">Analyze Data</h3>
                        <p className="text-sm text-gray-600">Our AI generates insights from responses</p>
                      </div>
                    </div>
                    <div className="absolute left-6 top-12 h-10 w-0.5 bg-pulse-300"></div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                        <h3 className="font-semibold text-pulse-700">Calculate PulseScore™</h3>
                        <p className="text-sm text-gray-600">Real-time workplace culture rating</p>
                      </div>
                    </div>
                    <div className="absolute left-6 top-12 h-10 w-0.5 bg-pulse-300"></div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                        <h3 className="font-semibold text-pulse-700">Certify & Publish</h3>
                        <p className="text-sm text-gray-600">Top companies get Pulse Certified and ranked</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 bg-white shadow-xl rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">85%</h3>
            <p className="text-gray-600">Higher retention for top-scoring companies</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">3.2x</h3>
            <p className="text-gray-600">Productivity increase in certified organizations</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">60%</h3>
            <p className="text-gray-600">Faster culture improvements with AI insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
