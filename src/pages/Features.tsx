
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import HeroSection from '@/components/features/HeroSection';
import DemoSection from '@/components/features/DemoSection';
import FeaturesTabs from '@/components/features/FeaturesTabs';
import TechnologyStack from '@/components/features/TechnologyStack';
import FeaturesCTA from '@/components/features/FeaturesCTA';

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState('core');
  const [demoActive, setDemoActive] = useState(false);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const toggleDemo = () => {
    setDemoActive(!demoActive);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="AI-Powered Features | PulsePlace.ai" 
        description="Explore the powerful AI and LLM capabilities of PulsePlace.ai for measuring and improving workplace culture."
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection demoActive={demoActive} toggleDemo={toggleDemo} />
        
        {/* Interactive Demo Section */}
        <DemoSection isActive={demoActive} />
        
        {/* Features Tabs */}
        <FeaturesTabs activeTab={activeTab} handleTabChange={handleTabChange} />
        
        {/* Technology Stack Section */}
        <TechnologyStack />
        
        {/* CTA */}
        <FeaturesCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
