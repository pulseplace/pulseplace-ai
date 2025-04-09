
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type HeroSectionProps = {
  demoActive: boolean;
  toggleDemo: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ demoActive, toggleDemo }) => {
  return (
    <motion.section 
      className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">Advanced AI</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Our suite of tools combines cutting-edge language models with organizational psychology to measure, understand, and enhance workplace trust.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join-beta">
                <Button className="bg-pulse-gradient hover:opacity-90">
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 flex items-center"
                onClick={toggleDemo}
              >
                {demoActive ? 'Hide Demo' : 'Watch Demo'} 
                <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${demoActive ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
