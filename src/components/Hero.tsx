
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, BarChart2, UserCheck, Users, Activity, Brain, Award, ChartBar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-pulse-gradient hover:opacity-90 transition-all h-12 px-6 text-base">
                    Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmitRequest}>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Join the Beta Program</DialogTitle>
                      <DialogDescription>
                        Be among the first to experience PulsePlace.ai and get your organization Pulse Certified.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="col-span-3" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="col-span-3" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="company" className="text-right">
                          Company
                        </Label>
                        <Input 
                          id="company" 
                          value={company} 
                          onChange={(e) => setCompany(e.target.value)} 
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="message" className="text-right">
                          Message
                        </Label>
                        <Textarea 
                          id="message" 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)} 
                          className="col-span-3"
                          placeholder="Tell us about your organization and why you're interested in joining the beta."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-pulse-gradient hover:opacity-90">
                        Submit Request
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base"
                onClick={scrollToFeatures}
              >
                Get Pulse Certified <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
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
          
          {/* Hero Graphic with Core Features */}
          <div className="w-full lg:w-1/2 relative">
            <div className="w-full h-80 md:h-96 lg:h-[500px] relative overflow-hidden rounded-2xl bg-gradient-to-br from-pulse-100 to-pulse-50 shadow-lg">
              {/* Dashboard Mockup */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[90%] h-[80%] bg-white rounded-xl shadow-lg overflow-hidden animate-float">
                <div className="h-8 bg-pulse-100 w-full flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-4">
                    <div className="w-32 h-8 bg-pulse-100 rounded-md"></div>
                    <div className="w-24 h-8 bg-teal-100 rounded-md"></div>
                  </div>
                  
                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {coreFeatures.map((feature, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-pulse-gradient flex items-center justify-center mb-2">
                          {feature.icon}
                        </div>
                        <h4 className="text-sm font-semibold text-pulse-700">{feature.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Visualization Area */}
                  <div className="h-32 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-pulse-700">Company PulseScore™</div>
                      <div className="text-xs font-bold text-pulse-800">85/100</div>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pulse-gradient w-[85%] rounded-full"></div>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div className="text-xs text-gray-500">Industry Average: 72</div>
                      <div className="text-xs text-teal-600 font-medium">+13 points</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400 opacity-20 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pulse-400 opacity-10 rounded-full animate-spin-slow"></div>
              
              {/* Floating Feature Tags */}
              <div className="absolute top-1/4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-pulse-600 shadow-md animate-pulse">
                Real-time Analysis
              </div>
              <div className="absolute bottom-1/4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-teal-600 shadow-md animate-pulse delay-500">
                Employee Trust Score
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
