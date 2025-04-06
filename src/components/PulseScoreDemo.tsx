
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const PulseScoreDemo = () => {
  const [emotionIndex, setEmotionIndex] = useState(75);
  const [engagementIndex, setEngagementIndex] = useState(82);
  const [cultureIndex, setCultureIndex] = useState(70);
  const [animateSlider, setAnimateSlider] = useState<number | null>(null);
  const { toast } = useToast();
  
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

  // Add animation to guide user
  useEffect(() => {
    // Show animation for the first slider after 2 seconds
    const timer = setTimeout(() => {
      setAnimateSlider(0);
      // After 3 seconds, animate the second slider
      setTimeout(() => {
        setAnimateSlider(1);
        // After 3 more seconds, animate the third slider
        setTimeout(() => {
          setAnimateSlider(2);
          // After 3 more seconds, clear animation
          setTimeout(() => {
            setAnimateSlider(null);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRandomize = () => {
    setEmotionIndex(Math.floor(Math.random() * 100));
    setEngagementIndex(Math.floor(Math.random() * 100));
    setCultureIndex(Math.floor(Math.random() * 100));
    toast({
      title: "Score Randomized",
      description: "See how different factors affect your overall PulseScore!",
    });
  };

  const handleReset = () => {
    setEmotionIndex(75);
    setEngagementIndex(82);
    setCultureIndex(70);
    toast({
      title: "Score Reset",
      description: "Values have been reset to the defaults.",
    });
  };
  
  return (
    <section id="pulse-score" className="py-16 md:py-24 bg-gray-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">PulseScore™ Methodology</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our scoring system in action. Adjust the sliders to see how different factors impact the overall PulseScore.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 feature-card">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6">Adjust the factors to see your PulseScore change</h3>
                
                <div className="space-y-8">
                  <div className={animateSlider === 0 ? "slider-highlight rounded-lg p-4" : "p-4"}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Emotion & Trust Index (40%)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">Based on sentiment analysis of employee survey responses and feedback.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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
                  
                  <div className={animateSlider === 1 ? "slider-highlight rounded-lg p-4" : "p-4"}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Engagement Stability Index (30%)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">Combines retention metrics, promotion rates, and participation levels.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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
                  
                  <div className={animateSlider === 2 ? "slider-highlight rounded-lg p-4" : "p-4"}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Culture Trust Score (30%)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">Evaluates policy effectiveness, inclusivity metrics, and team cohesion.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleRandomize} variant="outline" className="flex-1">
                      Randomize Values
                    </Button>
                    <Button onClick={handleReset} variant="outline" className="flex-1">
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-lg border-0 h-full flex flex-col feature-card">
              <CardContent className="p-8 flex flex-col justify-center items-center h-full">
                <h3 className="text-2xl font-bold mb-2">Your PulseScore</h3>
                
                <div className="relative w-48 h-48 mb-6">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center text-5xl font-bold bg-white border-8 cursor-pulse"
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

                <div className="mt-6">
                  <Button className="bg-pulse-gradient w-full mt-4">
                    Get Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PulseScoreDemo;
