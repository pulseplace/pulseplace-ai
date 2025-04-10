
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Award, Shield, LineChart, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const CertificationWorkflow = () => {
  const steps = [
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Data Collection",
      description: "Anonymous pulse surveys gather real-time feedback across your organization."
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "AI Analysis",
      description: "Our AI engine processes feedback to calculate your PulseScore™."
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Certification",
      description: "Organizations meeting the threshold receive Pulse Certified™ status."
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Promotion",
      description: "Showcase your certification with customizable badges and materials."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Certification Workflow
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your workplace culture data into a valuable certification that showcases your commitment to employee well-being.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="relative mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Horizontal line connecting steps */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-1 bg-gray-200 z-0"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative z-10 flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <div className="w-12 h-12 rounded-full bg-pulse-600 text-white flex items-center justify-center mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="md:hidden w-1 h-8 bg-gray-200 my-4"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-pulse-50 to-blue-50 p-8 rounded-xl border border-pulse-100 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">PulsePlace Certification Benefits</h3>
                <p className="text-gray-600 mb-6">
                  Pulse Certified™ organizations demonstrate their commitment to building positive workplace cultures based on real data, not testimonials.
                </p>
                <ul className="space-y-3">
                  {[
                    "Digital certification badges for your website and materials",
                    "Detailed certification report with comparative benchmarks",
                    "Inclusion in the PulsePlace certified employers directory",
                    "Access to exclusive insights and networking events"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 bg-white p-1 rounded-full border border-pulse-200">
                        <Check className="h-3 w-3 text-pulse-600" />
                      </div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/certification">
                    <Button className="bg-pulse-gradient hover:opacity-90">
                      Learn About Certification <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-pulse-100 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-pulse-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold">Pulse Certified™</h4>
                    <p className="text-sm text-gray-600">Recognized for excellence in workplace culture</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">PulseScore™</span>
                      <span className="text-sm font-bold">86/100</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-xs text-gray-600 mb-1">Trust</div>
                      <div className="text-base font-bold text-green-700">92%</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-xs text-gray-600 mb-1">Engagement</div>
                      <div className="text-base font-bold text-purple-700">88%</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="text-xs text-gray-600 mb-1">Growth</div>
                      <div className="text-base font-bold text-yellow-700">83%</div>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-lg text-center bg-gradient-to-r from-gray-50 to-white">
                    <p className="text-sm text-gray-600">Valid Until</p>
                    <p className="text-lg font-bold text-gray-900">June 2026</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <Link to="/dashboard-preview">
                    <Button variant="outline" size="sm">
                      Preview Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationWorkflow;
