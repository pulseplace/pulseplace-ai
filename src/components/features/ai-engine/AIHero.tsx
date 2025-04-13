
import React from 'react';
import { ArrowLeft, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIHero = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
        <Brain className="h-8 w-8 text-blue-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Engine Technology</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our proprietary AI engine powers all of PulsePlace.ai's intelligent features, delivering deep insights and actionable recommendations.
      </p>
    </div>
  );
};

export default AIHero;
