
import React from 'react';

const HeroStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 bg-white shadow-xl rounded-xl p-8">
      <div className="text-center">
        <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">85%</h3>
        <p className="text-gray-600">Higher retention for top-scoring companies</p>
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">3.2x</h3>
        <p className="text-gray-600">Productivity increase in certified organizations</p>
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent mb-2">60%</h3>
        <p className="text-gray-600">Faster culture improvements with AI insights</p>
      </div>
    </div>
  );
};

export default HeroStats;
