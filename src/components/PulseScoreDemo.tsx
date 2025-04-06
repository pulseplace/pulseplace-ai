
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const PulseScoreDemo = () => {
  const [emotionIndex, setEmotionIndex] = useState(75);
  const [engagementIndex, setEngagementIndex] = useState(82);
  const [cultureIndex, setCultureIndex] = useState(70);
  
  // Calculate the weighted PulseScore
  const pulseScore = Math.round(
    0.4 * emotionIndex + 0.3 * engagementIndex + 0.3 * cultureIndex
  );
  
  // Determine the tier based on the score
  const getTier = (score: number) => {
    if (score >= 85) return { label: 'Pulse Certified – Lovable Workplace', color: 'text-green-500' };
    if (score >= 70) return { label: 'Growth Culture – Building Excellence', color: 'text-blue-500' };
    if (score >= 50) return { label: 'Developing – Needs Improvement', color: 'text-yellow-500' };
    return { label: 'At-Risk – Critical Culture Risk', color: 'text-red-500' };
  };
  
  const tier = getTier(pulseScore);
  
  return (
    <section id="methodology" className="py-16 md:py-24 bg-gray-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">PulseScore™ Methodology</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our scoring system in action. Adjust the sliders to see how different factors impact the overall PulseScore.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6">Adjust the factors to see your PulseScore change</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Emotion & Trust Index (40%)</span>
                      <span className="font-semibold text-pulse-600">{emotionIndex}</span>
                    </div>
                    <Slider
                      value={[emotionIndex]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setEmotionIndex(value[0])}
                      className="py-4"
                    />
                    <p className="text-sm text-gray-500">
                      Based on sentiment analysis of employee survey responses.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Engagement Stability Index (30%)</span>
                      <span className="font-semibold text-pulse-600">{engagementIndex}</span>
                    </div>
                    <Slider
                      value={[engagementIndex]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setEngagementIndex(value[0])}
                      className="py-4"
                    />
                    <p className="text-sm text-gray-500">
                      Derived from retention rates, promotions, and absenteeism data.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Culture Trust Score (30%)</span>
                      <span className="font-semibold text-pulse-600">{cultureIndex}</span>
                    </div>
                    <Slider
                      value={[cultureIndex]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setCultureIndex(value[0])}
                      className="py-4"
                    />
                    <p className="text-sm text-gray-500">
                      Based on DEI percentages, policy effectiveness, and onboarding NPS.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-lg border-0 h-full flex flex-col">
              <CardContent className="p-8 flex flex-col justify-center items-center h-full">
                <h3 className="text-2xl font-bold mb-2">Your PulseScore</h3>
                
                <div className="relative w-48 h-48 mb-6">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center text-5xl font-bold bg-white border-8"
                    style={{ 
                      borderColor: pulseScore >= 85 ? '#10b981' : 
                                  pulseScore >= 70 ? '#3b82f6' : 
                                  pulseScore >= 50 ? '#f59e0b' : '#ef4444' 
                    }}
                  >
                    {pulseScore}
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold mb-2">
                  <span className={tier.color}>{tier.label}</span>
                </h4>
                
                <p className="text-gray-600 text-center">
                  {pulseScore >= 85 ? 'Congratulations! Your organization demonstrates exceptional workplace culture practices.' :
                   pulseScore >= 70 ? 'Your organization is on the right track with strong cultural foundations.' :
                   pulseScore >= 50 ? 'Your workplace shows potential but needs focused improvement efforts.' :
                   'Your organization requires immediate cultural intervention.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PulseScoreDemo;
