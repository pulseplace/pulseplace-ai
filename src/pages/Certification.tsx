
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Shield, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Certification = () => {
  const certificationLevels = [
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Pulse Certified™",
      score: "85+",
      description: "Exceptional workplace culture with high employee engagement and trust.",
      benefits: ["Premium certification badge", "Public recognition", "Case study opportunity"]
    },
    {
      icon: <Star className="h-8 w-8 text-blue-600" />,
      title: "Growth Culture™",
      score: "70-84",
      description: "Strong culture foundation with clear opportunities for improvement.",
      benefits: ["Growth certification badge", "Improvement roadmap", "Best practices guide"]
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: "Building Culture",
      score: "55-69",
      description: "Developing culture with focused areas for enhancement.",
      benefits: ["Development badge", "Action plan", "Monthly check-ins"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Culture Certification | PulsePlace.ai</title>
        <meta name="description" content="Get certified for your workplace culture excellence with PulsePlace.ai's comprehensive certification program." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Culture Certification Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Demonstrate your commitment to workplace excellence with our comprehensive culture certification program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {certificationLevels.map((level, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border">
                <div className="mb-6 flex justify-center">
                  <div className="bg-gray-50 p-4 rounded-full">
                    {level.icon}
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                  <div className="text-2xl font-bold text-pulse-600 mb-4">Score: {level.score}</div>
                  <p className="text-gray-600 mb-6">{level.description}</p>
                </div>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-pulse-600 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/dashboard/certification-engine">
              <Button className="bg-pulse-gradient text-white px-8 py-3 mr-4">
                Get Certified
              </Button>
            </Link>
            <Link to="/certification/share">
              <Button variant="outline" className="px-8 py-3">
                Share Certification
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certification;
