
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import PulseScoreDemo from '@/components/PulseScoreDemo';
import JoinBeta from '@/components/JoinBeta';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <PulseScoreDemo />
      <JoinBeta />
      <Footer />
    </div>
  );
};

export default Index;
