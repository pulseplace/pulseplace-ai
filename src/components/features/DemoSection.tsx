
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type DemoSectionProps = {
  isActive: boolean;
};

const DemoSection: React.FC<DemoSectionProps> = ({ isActive }) => {
  if (!isActive) return null;
  
  return (
    <motion.section 
      className="py-12 bg-white"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl p-6 shadow-md">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">See PulsePlace in Action</h3>
            <p className="mb-6">Learn how our AI technology works in real-time to transform workplace feedback into actionable insights</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard-preview">
                <Button className="bg-pulse-gradient hover:opacity-90 w-full sm:w-auto">
                  View Dashboard Demo
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button variant="outline" className="w-full sm:w-auto">
                  Schedule Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DemoSection;
