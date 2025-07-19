
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Target, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | PulsePlace.ai</title>
        <meta name="description" content="Learn about PulsePlace.ai's mission to transform workplace culture through data-driven insights." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About PulsePlace.ai
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to help organizations build thriving workplace cultures through the power of AI and data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-pulse-50 p-4 rounded-full">
                  <Target className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To quantify and improve workplace trust, making every organization a great place to work.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-pulse-50 p-4 rounded-full">
                  <Heart className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <p className="text-gray-600">
                We believe in transparency, data-driven decisions, and putting employee wellbeing first.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-pulse-50 p-4 rounded-full">
                  <Users className="h-8 w-8 text-pulse-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Our Team</h3>
              <p className="text-gray-600">
                A diverse group of technologists, researchers, and culture experts dedicated to workplace excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
