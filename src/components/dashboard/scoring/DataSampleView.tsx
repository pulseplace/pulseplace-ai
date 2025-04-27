
import React from 'react';
import { Card } from '@/components/ui/card';

const DataSampleView = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">PulseScore™ Data Structure</h3>
        <p className="text-gray-600">
          View how PulsePlace processes and analyzes survey responses to generate meaningful insights.
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Survey Response Format</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "responses": {
    "trust_leadership": 4,
    "psych_safety": 5,
    "inclusion": 4
  },
  "questionMapping": {
    "trust_leadership": {
      "theme": "trust_in_leadership",
      "weight": 1.2
    }
  }
}`}
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-2">Theme Score Calculation</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "theme": "trust_in_leadership",
  "score": 85,
  "count": 3
}`}
          </pre>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-2">Category Score Format</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "category": "culture_trust",
  "score": 82,
  "weight": 0.3
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default DataSampleView;
