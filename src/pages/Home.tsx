
import React from 'react';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import WhyPulsePlace from '@/components/WhyPulsePlace';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import FAQ from '@/components/FAQ';
import JoinBeta from '@/components/JoinBeta';
import MetaTags from '@/components/MetaTags';
import StickyCta from '@/components/StickyCta';
import EmailTestButton from '@/components/EmailTestButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <MetaTags
        title="PulsePlace.ai | Measuring Trust Through Data"
        description="Quantify, track, and improve workplace trust with AI. Get started with PulsePlace.ai today."
        keywords="workplace trust, employee trust, trust metrics, AI for HR, workplace analytics"
      />
      
      <Navbar />
      <Hero />
      
      <div className="container mx-auto py-4 mt-4">
        <div className="flex justify-center">
          <EmailTestButton recipientEmail="hello@pulseplace.ai" />
        </div>
      </div>
      
      <FeatureSection />
      <HowItWorks />
      <WhyPulsePlace />
      <Testimonials />
      <CallToAction />
      <FAQ />
      <JoinBeta />
      <StickyCta />
      <Footer />
    </div>
  );
};

export default Home;
