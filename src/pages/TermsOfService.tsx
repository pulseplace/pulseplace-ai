
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Scale, Users, Shield } from 'lucide-react';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | PulsePlace.ai</title>
        <meta name="description" content="Terms of Service for using PulsePlace.ai's workplace culture platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These terms govern your use of PulsePlace.ai's services and platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <Scale className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Fair Usage</h3>
                <p className="text-sm text-gray-600 mt-2">Clear guidelines for platform usage</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <Users className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">User Rights</h3>
                <p className="text-sm text-gray-600 mt-2">Your rights and responsibilities</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Service Level</h3>
                <p className="text-sm text-gray-600 mt-2">Our commitment to uptime and support</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-pulse-600" />
                  </div>
                </div>
                <h3 className="font-bold">Data Ownership</h3>
                <p className="text-sm text-gray-600 mt-2">You retain ownership of your data</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="text-gray-600 mb-8">
                  By accessing and using PulsePlace.ai, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-bold mb-4">Use License</h2>
                <p className="text-gray-600 mb-6">
                  Permission is granted to temporarily access PulsePlace.ai for personal, non-commercial transitory viewing only. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
                  <li>Using the platform to measure workplace culture</li>
                  <li>Accessing reports and analytics for your organization</li>
                  <li>Participating in surveys and feedback collection</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
                <p className="text-gray-600 mb-8">
                  We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue services with notice.
                </p>

                <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
                <p className="text-gray-600 mb-6">
                  Users agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
                  <li>Use the service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to other accounts</li>
                  <li>Submit false or misleading information</li>
                  <li>Interfere with the proper functioning of the service</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  For questions regarding these Terms of Service, please contact us at legal@pulseplace.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
