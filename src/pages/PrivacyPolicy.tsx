
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-pulse-600" />
              </div>
              <p className="text-lg text-gray-600">
                Last updated: April 6, 2025
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Lock className="mr-2 h-6 w-6 text-pulse-600" />
                  Introduction
                </h2>
                <p>
                  At PulsePlace.ai ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Eye className="mr-2 h-6 w-6 text-pulse-600" />
                  Information We Collect
                </h2>
                <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                <p>
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul>
                  <li>Register for an account</li>
                  <li>Sign up for our newsletter</li>
                  <li>Complete forms on our website</li>
                  <li>Participate in surveys or feedback requests</li>
                  <li>Contact our customer support</li>
                </ul>
                <p>
                  This information may include your name, email address, job title, company name, and phone number.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Employee Feedback Data</h3>
                <p>
                  For organizations using our platform, we collect and process employee feedback data. This information is provided by employees through our platform and may include:
                </p>
                <ul>
                  <li>Responses to workplace culture assessments</li>
                  <li>Comments and feedback on workplace experiences</li>
                  <li>Engagement metrics and satisfaction ratings</li>
                </ul>
                <p>
                  We treat this data with the utmost confidentiality and use it only for the purposes outlined in this policy.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Automatically Collected Information</h3>
                <p>
                  When you visit our website or use our platform, we may automatically collect certain information about your device and usage patterns. This includes:
                </p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Time and date of your visit</li>
                  <li>Pages you viewed</li>
                  <li>Time spent on those pages</li>
                  <li>Referring website addresses</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-pulse-600" />
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect for various purposes, including to:
                </p>
                <ul>
                  <li>Provide, operate, and maintain our services</li>
                  <li>Improve, personalize, and expand our services</li>
                  <li>Understand and analyze how you use our services</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, such as updates, security alerts, and support messages</li>
                  <li>Respond to customer service requests and support needs</li>
                  <li>Generate anonymized, aggregated insights for workplace culture analysis</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
                <p>
                  We may share your personal information in the following situations:
                </p>
                <ul>
                  <li><strong>With Service Providers:</strong> We may share your information with third-party vendors and service providers that provide services on our behalf, such as hosting, data analysis, payment processing, and customer service.</li>
                  <li><strong>With Your Organization:</strong> If you use our services as part of your organization's workplace assessment, your feedback may be shared with your organization in an anonymized and aggregated format.</li>
                  <li><strong>With Your Consent:</strong> We may share your information for any other purpose disclosed to you with your consent.</li>
                  <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, acquisition, reorganization, or sale of all or a portion of our assets.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>The right to access the personal information we have about you</li>
                  <li>The right to request that we correct or update your personal information</li>
                  <li>The right to request that we delete your personal information</li>
                  <li>The right to opt-out of marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@pulseplace.ai<br />
                  <strong>Address:</strong> PulsePlace.ai Headquarters, 123 Culture Way, San Francisco, CA 94105
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
