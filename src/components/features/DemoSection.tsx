
import React from 'react';
import { motion } from 'framer-motion';

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
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="PulsePlace.ai Demo" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            See how our AI technology works in real-time to transform workplace feedback into actionable insights
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DemoSection;
