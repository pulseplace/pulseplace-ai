
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RoiCalculator = () => {
  const [employees, setEmployees] = useState(100);
  const [turnoverRate, setTurnoverRate] = useState(15);
  const [averageSalary, setAverageSalary] = useState(60000);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    // Simple ROI calculation
    setShowResults(true);
  };

  // Calculate some sample metrics
  const currentCost = Math.round(employees * (turnoverRate / 100) * averageSalary * 1.5);
  const projectedCost = Math.round(currentCost * 0.7);
  const savings = currentCost - projectedCost;
  const roi = Math.round((savings / 10000) * 100);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">ROI Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Your Potential Savings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="turnover">Current Annual Turnover Rate (%)</Label>
              <Input
                id="turnover"
                type="number"
                value={turnoverRate}
                onChange={(e) => setTurnoverRate(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="salary">Average Employee Salary ($)</Label>
              <Input
                id="salary"
                type="number"
                value={averageSalary}
                onChange={(e) => setAverageSalary(parseInt(e.target.value) || 0)}
              />
            </div>
            <Button className="w-full mt-4" onClick={calculateROI}>
              Calculate ROI
            </Button>
          </div>
        </Card>

        {showResults && (
          <Card className="p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Your PulsePlace ROI</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Current Annual Turnover Cost:</span>
                <span className="font-semibold">${currentCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Projected Cost After PulsePlace:</span>
                <span className="font-semibold">${projectedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-green-600">
                <span>Potential Annual Savings:</span>
                <span className="font-semibold">${savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Return on Investment:</span>
                <span>{roi}%</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoiCalculator;
