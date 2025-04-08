
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollText, CheckSquare, Scale, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <div className="flex justify-center mb-4">
                <ScrollText className="h-12 w-12 text-pulse-600" />
              </div>
              <p className="text-lg text-gray-600">
                Last updated: April 6, 2025
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-left">
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <CheckSquare className="mr-2 h-6 w-6 text-pulse-600" />
                  Agreement to Terms
                </h2>
                <p className="mb-4">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and PulsePlace.ai ("we," "our," or "us") governing your access to and use of the PulsePlace.ai website, platform, and services (collectively, the "Services").
                </p>
                <p className="mb-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Scale className="mr-2 h-6 w-6 text-pulse-600" />
                  Use of Services
                </h2>
                <h3 className="text-xl font-semibold mb-2">Account Registration</h3>
                <p className="mb-4">
                  To access certain features of the Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Account Security</h3>
                <p className="mb-4">
                  You are responsible for safeguarding your account password and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Acceptable Use</h3>
                <p className="mb-4">
                  You agree not to use the Services to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">Violate any applicable law, regulation, or third-party rights</li>
                  <li className="mb-2">Upload or transmit viruses, malware, or other malicious code</li>
                  <li className="mb-2">Interfere with or disrupt the integrity or performance of the Services</li>
                  <li className="mb-2">Attempt to gain unauthorized access to the Services or related systems</li>
                  <li className="mb-2">Collect or harvest data from the Services without our consent</li>
                  <li className="mb-2">Use the Services to send unsolicited communications</li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
                <h3 className="text-xl font-semibold mb-2">Our Intellectual Property</h3>
                <p className="mb-4">
                  The Services and all content, features, and functionality thereof, including but not limited to text, graphics, logos, icons, images, audio clips, software, and the design, selection, and arrangement thereof, are owned by PulsePlace.ai, its licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Your Content</h3>
                <p className="mb-4">
                  By submitting, posting, or displaying content on or through the Services ("User Content"), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content in connection with providing and improving the Services.
                </p>
                <p className="mb-4">
                  You represent and warrant that you have all rights necessary to grant the license above and that your User Content does not violate any third-party rights or applicable laws.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Subscription and Payment</h2>
                <h3 className="text-xl font-semibold mb-2">Subscription Terms</h3>
                <p className="mb-4">
                  Some of our Services are available on a subscription basis. By subscribing to such Services, you agree to pay the applicable subscription fees as they become due. Subscription fees are non-refundable except as expressly stated in these Terms or as required by applicable law.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Billing</h3>
                <p className="mb-4">
                  We bill subscription fees to the payment method you provide during registration. You agree to maintain current, complete, and accurate billing information. We may change the fees for the Services with reasonable notice.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-6">Cancellation</h3>
                <p className="mb-4">
                  You may cancel your subscription at any time by contacting us or through your account settings. Upon cancellation, your subscription will remain active until the end of the current billing period, and you will not receive a refund for any fees already paid.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-6 w-6 text-pulse-600" />
                  Limitation of Liability
                </h2>
                <p className="mb-4">
                  To the maximum extent permitted by applicable law, PulsePlace.ai and its officers, directors, employees, agents, affiliates, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your access to or use of the Services.
                </p>
                <p className="mb-4">
                  In no event shall our total liability to you for all claims exceed the amount paid by you to us during the twelve (12) months preceding the event giving rise to the liability.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
                <p className="mb-4">
                  The Services are provided on an "as is" and "as available" basis, without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                </p>
                <p className="mb-4">
                  We do not warrant that the Services will function uninterrupted, secure, or available at any particular time or location, or that any errors or defects will be corrected.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p className="mb-4">
                  You agree to defend, indemnify, and hold harmless PulsePlace.ai and its officers, directors, employees, agents, affiliates, and licensors from and against any claims, liabilities, damages, losses, and expenses, including but not limited to reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Services, your violation of these Terms, or your violation of any rights of another.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Governing Law and Jurisdiction</h2>
                <p className="mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You agree that any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the federal or state courts located in San Francisco, California.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website. Your continued use of the Services after such notification constitutes your acceptance of the modified Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> legal@pulseplace.ai<br />
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

export default TermsOfService;
