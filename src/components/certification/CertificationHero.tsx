
import React from 'react';
import { CheckCircle2, TrendingUp, Users, Shield } from 'lucide-react';

const CertificationHero = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-pulse-50 via-white to-pulse-50">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
          Pulse Certified<span className="text-pulse-600">™</span> Companies
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
          Discover organizations that have demonstrated exceptional workplace culture and employee experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Excellence</h3>
            <p className="text-gray-600 text-sm">Third-party validated workplace culture assessment</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Data-Driven</h3>
            <p className="text-gray-600 text-sm">Based on comprehensive employee feedback and sentiment analysis</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Talent Magnet</h3>
            <p className="text-gray-600 text-sm">Certified companies attract and retain top talent</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Shield className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trust Builder</h3>
            <p className="text-gray-600 text-sm">Signal to customers and partners your commitment to people</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationHero;
