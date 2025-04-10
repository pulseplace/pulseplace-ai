
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronRight, Brain, MessageSquare, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  demoActive: boolean;
  toggleDemo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  demoActive,
  toggleDemo
}) => {
  const features = [
    {
      icon: <Brain className="h-5 w-5 text-pulse-600" />,
      title: "AI-Powered Intelligence",
      description: "Natural language processing that understands sentiment and culture dynamics"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-pulse-600" />,
      title: "PulseBot AI Assistant",
      description: "Gather feedback through conversational interactions"
    },
    {
      icon: <Award className="h-5 w-5 text-pulse-600" />,
      title: "Pulse Certified™",
      description: "Data-driven certification based on authentic culture metrics"
    }
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-white to-pulse-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                AI-Powered Features for Workplace Culture
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform employee feedback into actionable insights with advanced AI technology designed to measure, improve, and certify your workplace culture.
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  >
                    <div className="mt-1 bg-pulse-100 p-2 rounded-full">
                      {feature.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join-beta">
                  <Button className="bg-pulse-gradient hover:opacity-90">
                    Get Started <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={toggleDemo}>
                  {demoActive ? "Hide Demo" : "View Demo"}
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="relative lg:pl-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
                <img 
                  src="/lovable-uploads/da2df9b1-afa2-4019-be42-cbfdedf8740b.png" 
                  alt="PulsePlace Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">PulsePlace Dashboard</h3>
                    <p className="text-sm opacity-90">AI-powered insights for workplace culture</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Pulse Certified™</p>
                    <p className="text-xs text-gray-500">86/100</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">PulseBot</p>
                    <p className="text-xs text-gray-500">24/7 Assistant</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Background decoration */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full opacity-20 -z-10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 w-80 h-80 bg-blue-200 rounded-full opacity-20 -z-10 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
