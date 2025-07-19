
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | PulsePlace.ai</title>
        <meta name="description" content="Learn how PulsePlace.ai protects your data and respects your privacy." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Data Protection</h3>
                <p className="text-sm text-gray-600 mt-2">Enterprise-grade security for all your data</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <Lock className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Encryption</h3>
                <p className="text-sm text-gray-600 mt-2">All data encrypted in transit and at rest</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Transparency</h3>
                <p className="text-sm text-gray-600 mt-2">Clear disclosure of data usage</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Compliance</h3>
                <p className="text-sm text-gray-600 mt-2">GDPR and SOC 2 compliant</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-6">
                  We collect information to provide better services to our users. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
                  <li>Survey responses and feedback data</li>
                  <li>Account information (name, email, organization)</li>
                  <li>Usage analytics and platform interactions</li>
                  <li>Technical information (IP address, browser type)</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-6">
                  Your information helps us:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
                  <li>Provide and improve our culture measurement services</li>
                  <li>Generate insights and analytics for your organization</li>
                  <li>Communicate important updates and support information</li>
                  <li>Ensure platform security and prevent abuse</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-gray-600 mb-8">
                  We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your data.
                </p>

                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions about this Privacy Policy, please contact us at privacy@pulseplace.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
