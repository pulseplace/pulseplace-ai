
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | PulsePlace.ai</title>
        <meta name="description" content="Get in touch with PulsePlace.ai team for demos, support, or partnership opportunities." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your workplace culture? Get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-pulse-600 mr-4" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">hello@pulseplace.ai</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-pulse-600 mr-4" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-pulse-600 mr-4" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Schedule a Demo</h2>
              <p className="text-gray-600 mb-6">
                See PulsePlace.ai in action with a personalized demo tailored to your organization's needs.
              </p>
              <Link to="/book-demo">
                <Button className="bg-pulse-gradient text-white mb-4 w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Demo
                </Button>
              </Link>
              <Link to="/join-beta">
                <Button variant="outline" className="w-full">
                  Join Beta Program
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
