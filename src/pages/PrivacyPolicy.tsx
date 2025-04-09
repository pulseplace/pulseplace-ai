
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import MetaTags from '@/components/MetaTags';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Privacy Policy | PulsePlace.ai" 
        description="How PulsePlace.ai collects, uses, and protects your data."
      />
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                At PulsePlace.ai, we collect several types of information to provide and improve our services:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal information you provide (name, email, company details)</li>
                <li>Organization data related to workplace culture metrics</li>
                <li>Survey responses and feedback</li>
                <li>Usage data and analytics</li>
                <li>Technical information (device, browser, IP address)</li>
              </ul>
              <p>
                We collect this information only with your consent and for specific business purposes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and analyze workplace culture data</li>
                <li>Generate certification reports and insights</li>
                <li>Communicate with you about our services</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                We process and store data on secure servers and use encryption to protect sensitive information transmitted online.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal data, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to delete your data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@pulseplace.ai.
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

export default PrivacyPolicy;
