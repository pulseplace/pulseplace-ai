
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RoiCalculator = () => {
  const [employees, setEmployees] = useState<number>(100);
  const [averageSalary, setAverageSalary] = useState<number>(75000);
  const [turnoverRate, setTurnoverRate] = useState<number>(15);

  const calculateROI = () => {
    const annualTurnoverCost = employees * (turnoverRate / 100) * (averageSalary * 0.75);
    const potentialSavings = annualTurnoverCost * 0.3; // 30% reduction assumption
    const platformCost = employees * 12; // $12 per employee per month
    const annualROI = potentialSavings - platformCost;
    
    return {
      turnoverCost: annualTurnoverCost,
      savings: potentialSavings,
      platformCost,
      roi: annualROI,
      roiPercentage: ((annualROI / platformCost) * 100)
    };
  };

  const results = calculateROI();

  return (
    <>
      <Helmet>
        <title>ROI Calculator | PulsePlace.ai</title>
        <meta name="description" content="Calculate the return on investment for implementing PulsePlace.ai in your organization." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ROI Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the potential return on investment for implementing PulsePlace.ai in your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-pulse-600 mr-2" />
                Your Organization
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="salary">Average Annual Salary ($)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={averageSalary}
                    onChange={(e) => setAverageSalary(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="turnover">Current Turnover Rate (%)</Label>
                  <Input
                    id="turnover"
                    type="number"
                    value={turnoverRate}
                    onChange={(e) => setTurnoverRate(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-pulse-600 mr-2" />
                ROI Analysis
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-600 font-medium">Annual Turnover Cost</div>
                  <div className="text-2xl font-bold text-red-700">
                    ${results.turnoverCost.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Potential Annual Savings</div>
                  <div className="text-2xl font-bold text-green-700">
                    ${results.savings.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Annual Platform Cost</div>
                  <div className="text-2xl font-bold text-blue-700">
                    ${results.platformCost.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 bg-pulse-50 rounded-lg border-2 border-pulse-200">
                  <div className="text-sm text-pulse-600 font-medium">Net Annual ROI</div>
                  <div className="text-3xl font-bold text-pulse-700">
                    ${results.roi.toLocaleString()}
                  </div>
                  <div className="text-sm text-pulse-600 mt-1">
                    {results.roiPercentage.toFixed(0)}% Return
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-pulse-gradient text-white px-8 py-3">
              <DollarSign className="h-4 w-4 mr-2" />
              Get Detailed ROI Report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoiCalculator;
