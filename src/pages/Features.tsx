
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import HeroSection from '@/components/features/HeroSection';
import AIFeaturesSection from '@/components/features/AIFeaturesSection';
import PulseBotDemo from '@/components/features/PulseBotDemo';
import InsightsDashboard from '@/components/features/InsightsDashboard';
import CertificationWorkflow from '@/components/features/CertificationWorkflow';
import FeaturesCTA from '@/components/features/FeaturesCTA';
import { motion, useScroll, useSpring } from 'framer-motion';

const Features: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'ai-features', 'pulsebot', 'dashboard', 'certification'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="AI-Powered Features | PulsePlace.ai" 
        description="Explore the powerful AI and LLM capabilities of PulsePlace.ai for measuring and improving workplace culture."
      />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-pulse-600 z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection demoActive={false} toggleDemo={() => {}} />
        </section>
        
        {/* AI Features Section */}
        <section id="ai-features">
          <AIFeaturesSection />
        </section>
        
        {/* PulseBot Demo */}
        <section id="pulsebot">
          <PulseBotDemo />
        </section>
        
        {/* Insights Dashboard */}
        <section id="dashboard">
          <InsightsDashboard />
        </section>
        
        {/* Certification Workflow */}
        <section id="certification">
          <CertificationWorkflow />
        </section>
        
        {/* CTA */}
        <FeaturesCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
