
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FeaturesCTA = () => {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://calendly.com/pulseplace/demo", "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-pulse-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Workplace Culture?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Experience how PulsePlace.ai's advanced AI technology can help you measure, improve, and showcase your authentic workplace culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join-beta">
              <Button size="lg" className="bg-pulse-gradient hover:opacity-90">
                Join Beta Program <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a 
              href="https://calendly.com/pulseplace/demo" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleDemoClick}
            >
              <Button size="lg" variant="outline">
                Book a Demo <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <span className="block text-2xl font-bold text-pulse-600 mb-1">4x</span>
              <p className="text-gray-600">Faster feedback collection compared to traditional surveys</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <span className="block text-2xl font-bold text-pulse-600 mb-1">87%</span>
              <p className="text-gray-600">Of employees prefer pulse surveys over annual reviews</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <span className="block text-2xl font-bold text-pulse-600 mb-1">23%</span>
              <p className="text-gray-600">Average improvement in retention after certification</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCTA;
