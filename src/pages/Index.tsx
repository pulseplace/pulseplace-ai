
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyPulsePlace from '@/components/WhyPulsePlace';
import FeatureSection from '@/components/FeatureSection';
import LandingPageDemo from '@/components/LandingPageDemo';
import HowItWorks from '@/components/HowItWorks';
import PulseScoreDemo from '@/components/PulseScoreDemo';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';
import JoinBeta from '@/components/JoinBeta';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyPulsePlace />
      <FeatureSection />
      <LandingPageDemo />
      <HowItWorks />
      <PulseScoreDemo />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <JoinBeta />
      <Footer />
    </div>
  );
};

export default Index;
