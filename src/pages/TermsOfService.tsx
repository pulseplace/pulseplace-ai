
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import MetaTags from '@/components/MetaTags';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Terms of Service | PulsePlace.ai" 
        description="Terms and conditions for using PulsePlace.ai services."
      />
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to PulsePlace.ai. These Terms of Service govern your use of our website, applications, and services. By accessing or using PulsePlace.ai, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree with any part of these terms, you may not access our service.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
              <p className="mb-4">
                Our services are provided for business purposes related to workplace culture measurement, certification, and improvement. You agree to use our services only for lawful purposes and in accordance with these Terms.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">3. Privacy and Data</h2>
              <p className="mb-4">
                Our Privacy Policy, which is incorporated into these Terms, explains how we collect, use, and protect your data. By using our services, you consent to our data practices as described in our Privacy Policy.
              </p>
              <p>
                You retain ownership of all data you provide to us. We process this data in accordance with our agreements with you and applicable privacy laws.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                The content, features, and functionality of our services are owned by PulsePlace.ai and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works from, publicly display, or use our intellectual property without our express written permission.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
              <p>
                We may terminate or suspend your account and access to our services immediately, without prior notice, for any breach of these Terms or for any other reason we deem appropriate.
              </p>
            </CardContent>
          </Card>
          
          <p className="text-gray-600 italic mt-8">
            Last updated: April 2025
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
