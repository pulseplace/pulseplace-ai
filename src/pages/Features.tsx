
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoreFeaturesTab from '@/components/features/CoreFeaturesTab';
import AIFeaturesTab from '@/components/features/AIFeaturesTab';
import IntegrationsTab from '@/components/features/IntegrationsTab';
import FeaturesCTA from '@/components/features/FeaturesCTA';
import ValidationButton from '@/components/testing/ValidationButton';
import { LinkValidationResult } from '@/utils/linkValidation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Features = () => {
  const [validationResults, setValidationResults] = useState<LinkValidationResult[] | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  
  const handleValidationComplete = (results: LinkValidationResult[]) => {
    setValidationResults(results);
    setShowDebug(true);
  };
  
  return (
    <>
      <Helmet>
        <title>AI-Powered Features | PulsePlace.ai</title>
        <meta name="description" content="Explore PulsePlace.ai's AI-powered features designed to measure, improve, and showcase workplace culture." />
        <meta name="keywords" content="AI features, workplace culture, employee engagement, certification, analytics" />
        <meta property="og:title" content="AI-Powered Features | PulsePlace.ai" />
        <meta property="og:description" content="Explore the full suite of PulsePlace.ai features for workplace culture transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pulseplace.ai/features" />
        <meta property="og:image" content="https://pulseplace.ai/images/features-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Powered Features | PulsePlace.ai" />
        <meta name="twitter:description" content="Explore the full suite of PulsePlace.ai features for workplace culture transformation." />
        <meta name="twitter:image" content="https://pulseplace.ai/images/features-twitter-card.jpg" />
      </Helmet>
      
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Features Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how PulsePlace.ai's innovative features can help you measure, improve, and showcase your workplace culture.
            </p>
            
            {/* Debug section - only visible after validation runs */}
            {showDebug && validationResults && (
              <div className="mt-8">
                <Alert className="max-w-xl mx-auto">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Link Validation Results</AlertTitle>
                  <AlertDescription>
                    Found {validationResults.length} links, with {validationResults.filter(r => !r.isValid).length} potential issues.
                    <div className="mt-2">
                      <ValidationButton variant="text" className="mx-auto" onComplete={handleValidationComplete} />
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
          
          {/* Features Navigation Tabs */}
          <Tabs defaultValue="core" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="core">Core Features</TabsTrigger>
              <TabsTrigger value="ai">AI Features</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            <TabsContent value="core">
              <CoreFeaturesTab />
            </TabsContent>
            <TabsContent value="ai">
              <AIFeaturesTab />
            </TabsContent>
            <TabsContent value="integrations">
              <IntegrationsTab />
            </TabsContent>
          </Tabs>
          
          {/* Hidden in production - only for dev environment */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowDebug(!showDebug)} 
              className="text-xs text-gray-400 underline hover:text-gray-600"
            >
              {showDebug ? 'Hide Debug Tools' : 'Show Debug Tools'}
            </button>
            {showDebug && (
              <div className="mt-4 max-w-xl mx-auto">
                <ValidationButton variant="full" onComplete={handleValidationComplete} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <FeaturesCTA />
    </>
  );
};

export default Features;
