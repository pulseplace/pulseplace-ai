
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PulseCertification = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>Pulse Certification | PulsePlace.ai</title>
        <meta 
          name="description" 
          content="Data-driven workplace culture certification based on real employee feedback."
        />
      </Helmet>
      
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pulse Certification</h1>
          <p className="text-lg text-gray-600 mb-8">
            Validate and showcase your authentic workplace culture with data-driven certification.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/certification">
              <Button className="bg-pulse-gradient hover:opacity-90">
                Learn More About Certification
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button variant="outline">
                Book a Demo
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Award className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Credible Validation</h3>
            </div>
            <p className="text-gray-600">
              Third-party validation of your workplace culture based on real employee feedback.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Retention Impact</h3>
            </div>
            <p className="text-gray-600">
              Companies with Pulse Certification see an average 23% improvement in employee retention.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold ml-3">Brand Enhancement</h3>
            </div>
            <p className="text-gray-600">
              Digital badges and certificates to showcase your certified workplace culture.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PulseCertification;
