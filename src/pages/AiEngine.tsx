
import React from 'react';

const AiEngine = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">AI Engine</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg mb-4">
          Our AI Engine powers PulsePlace with advanced workplace culture analytics.
        </p>
        <p className="mb-4">
          Leveraging natural language processing and machine learning, we extract meaningful insights
          from employee feedback and sentiment data to help organizations improve their workplace culture.
        </p>
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sentiment analysis across departments and teams</li>
            <li>Theme identification from open-ended responses</li>
            <li>Predictive analytics for employee retention</li>
            <li>Custom insight generation based on your organization's unique culture</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiEngine;
