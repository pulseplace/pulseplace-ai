
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Building2, Lock, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MetaTags from '@/components/MetaTags';
import Hero from '@/components/hero';
import FeatureHighlightBox from '@/components/FeatureHighlightBox';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import WhyPulsePlace from '@/components/WhyPulsePlace';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import FAQ from '@/components/FAQ';
import JoinBeta from '@/components/JoinBeta';
import DashboardPreview from '@/components/DashboardPreview';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <div className="min-h-screen">
      <MetaTags
        title="PulsePlace.ai | Measuring Trust Through Data"
        description="Quantify, track, and improve workplace trust with AI. Get started with PulsePlace.ai today."
        keywords="workplace trust, employee trust, trust metrics, AI for HR, workplace analytics"
      />
      
      <Hero />
      
      {/* Add Feature Highlight Box right after the Hero */}
      <FeatureHighlightBox />
      
      {/* Brand Pitch Section */}
      <section className="py-16 bg-white" id="mission">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                The Only Platform That Quantifies Workplace Trust
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 mb-8"
              >
                Most organizations recognize that trust is crucial, but few know how to measure or improve it. 
                PulsePlace provides a data-driven approach to measuring, tracking, and enhancing trust within your organization.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              >
                <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
                  <div className="mb-4 p-3 rounded-full bg-pulse-100">
                    <Building2 className="h-6 w-6 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">For Organizations</h3>
                  <p className="text-gray-600 text-center">Improve retention, innovation, and productivity through enhanced workplace trust.</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
                  <div className="mb-4 p-3 rounded-full bg-pulse-100">
                    <Users className="h-6 w-6 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">For HR Leaders</h3>
                  <p className="text-gray-600 text-center">Get actionable insights to build stronger teams and attract top talent.</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
                  <div className="mb-4 p-3 rounded-full bg-pulse-100">
                    <Shield className="h-6 w-6 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">For Executives</h3>
                  <p className="text-gray-600 text-center">Demonstrate your commitment to creating a positive work environment.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-12">
                <Link to="/demo">
                  <Button className="bg-pulse-gradient">
                    Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <FeatureSection />
      <HowItWorks />
      <DashboardPreview />
      <WhyPulsePlace />
      <Testimonials />
      <CallToAction />
      <FAQ />
      <JoinBeta />
    </div>
  );
};

export default Home;
