
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Brain, BarChart3, Award, CheckCircle } from 'lucide-react';

const Methodology = () => {
  return (
    <>
      <Helmet>
        <title>Our Methodology | PulsePlace.ai</title>
        <meta name="description" content="Learn about PulsePlace.ai's scientific methodology for measuring workplace culture and trust." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Methodology
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our scientific approach to measuring workplace culture is based on validated research and AI-powered analysis.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">PulseScore Formula</h2>
            <div className="text-center mb-8">
              <div className="text-3xl font-bold text-pulse-600 mb-4">
                PulseScore = 40% Emotion + 30% Stability + 30% Trust
              </div>
              <p className="text-gray-600">
                Our weighted algorithm considers the three key pillars of workplace culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-pulse-50 p-4 rounded-full w-fit mx-auto mb-4">
                  <Brain className="h-8 w-8 text-pulse-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Emotion (40%)</h3>
                <p className="text-gray-600">Employee satisfaction, engagement, and emotional wellbeing</p>
              </div>

              <div className="text-center">
                <div className="bg-pulse-50 p-4 rounded-full w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-pulse-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Stability (30%)</h3>
                <p className="text-gray-600">Work-life balance, job security, and organizational stability</p>
              </div>

              <div className="text-center">
                <div className="bg-pulse-50 p-4 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-8 w-8 text-pulse-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Trust (30%)</h3>
                <p className="text-gray-600">Leadership transparency, peer relationships, and organizational integrity</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Certification Tiers</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span><strong>85+:</strong> Pulse Certified™ - Exceptional workplace culture</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span><strong>70-84:</strong> Growth Culture™ - Strong foundation with growth opportunities</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                <span><strong>55-69:</strong> At Risk - Developing culture requiring attention</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-red-600 mr-3" />
                <span><strong>&lt;55:</strong> Critical Culture Risk - Immediate intervention needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Methodology;
