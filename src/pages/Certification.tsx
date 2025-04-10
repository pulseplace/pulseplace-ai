
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ShieldCheck, BarChart, BadgeCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MetaTags from '@/components/MetaTags';

const Certification = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen pt-20">
      <MetaTags
        title="Workplace Trust Certification | PulsePlace.ai"
        description="Demonstrate your commitment to workplace trust with PulsePlace's certification program. Earn Bronze, Silver, or Gold level recognition."
      />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-pulse-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Workplace Trust Certification</h1>
            <p className="text-xl text-gray-600 mb-8">
              Demonstrate your commitment to creating a trust-based workplace culture with our recognized certification program.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pulse-gradient" asChild>
                <Link to="/join-beta">Start Certification Process</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certification Levels */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Certification Levels</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our tiered certification program recognizes organizations at different stages of their workplace trust journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Bronze Level */}
            <Card className="border border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Bronze Level</h3>
                <p className="text-center text-gray-600 mb-4">
                  Foundation of workplace trust established
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Basic trust assessment completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Action plan development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Annual renewal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Silver Level */}
            <Card className="border border-gray-300 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Award className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Silver Level</h3>
                <p className="text-center text-gray-600 mb-4">
                  Substantial progress in trust metrics
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>Comprehensive trust assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>Implementation of trust initiatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>Biannual progress reviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Gold Level */}
            <Card className="border border-yellow-300 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Gold Level</h3>
                <p className="text-center text-gray-600 mb-4">
                  Excellence in workplace trust achievement
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Advanced trust metrics achievement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Industry benchmarking leader</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Recognition as workplace trust exemplar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <motion.section 
        ref={ref}
        variants={containerAnimation}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Certification</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gain competitive advantages by demonstrating your commitment to workplace trust
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div variants={itemAnimation} className="flex flex-col items-center text-center p-6">
              <div className="bg-pulse-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-pulse-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Employer Branding</h3>
              <p className="text-gray-600">
                Enhance your reputation as an employer of choice with official certification
              </p>
            </motion.div>
            
            <motion.div variants={itemAnimation} className="flex flex-col items-center text-center p-6">
              <div className="bg-pulse-100 p-4 rounded-full mb-4">
                <BarChart className="h-8 w-8 text-pulse-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Retention Improvement</h3>
              <p className="text-gray-600">
                Organizations with high trust scores experience 50% higher retention rates
              </p>
            </motion.div>
            
            <motion.div variants={itemAnimation} className="flex flex-col items-center text-center p-6">
              <div className="bg-pulse-100 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-pulse-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Badges</h3>
              <p className="text-gray-600">
                Showcase your certification on your website, social media, and marketing materials
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <section className="py-16 bg-pulse-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Certified?</h2>
            <p className="text-xl mb-8">
              Start your certification journey today and showcase your commitment to workplace trust.
            </p>
            <Button size="lg" className="bg-white text-pulse-600 hover:bg-gray-100" asChild>
              <Link to="/join-beta">
                Begin Certification Process <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certification;
