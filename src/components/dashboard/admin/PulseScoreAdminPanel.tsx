
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { PresetButtons } from './components/PresetButtons';
import { FactorSlider } from './components/FactorSlider';
import { WeightIndicator } from './components/WeightIndicator';
import { defaultFactors, type ScoringFactor } from './data/pulseScoreFactors';

// Presets configuration
const presets = [
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Equal weighting across all factors',
    weights: {
      engagement: 12.5,
      trust: 12.5,
      dei: 12.5,
      growth: 12.5,
      innovation: 12.5,
      recognition: 12.5,
      worklife: 12.5,
      purpose: 12.5
    }
  },
  {
    id: 'dei-focused',
    name: 'DEI-Focused',
    description: 'Emphasis on diversity and inclusion',
    weights: {
      engagement: 10,
      trust: 10,
      dei: 30,
      growth: 10,
      innovation: 10,
      recognition: 10,
      worklife: 10,
      purpose: 10
    }
  },
  {
    id: 'engagement-first',
    name: 'Engagement-First',
    description: 'Focus on engagement and trust',
    weights: {
      engagement: 25,
      trust: 20,
      dei: 10,
      growth: 10,
      innovation: 5,
      recognition: 10,
      worklife: 15,
      purpose: 5
    }
  }
];

const PulseScoreAdminPanel: React.FC = () => {
  const { toast } = useToast();
  const [factors, setFactors] = useState<ScoringFactor[]>(defaultFactors);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  
  const handleWeightChange = (factorId: string, newValue: number[]) => {
    setFactors(prev => prev.map(factor => 
      factor.id === factorId ? {...factor, weight: newValue[0]} : factor
    ));
    setActivePreset(null);
  };
  
  const applyPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    
    setFactors(prev => prev.map(factor => ({
      ...factor,
      weight: preset.weights[factor.id as keyof typeof preset.weights] || factor.weight
    })));
    
    setActivePreset(presetId);
    
    toast({
      title: "Preset Applied",
      description: `${preset.name} preset has been applied to scoring factors.`,
    });
  };
  
  const resetToDefault = () => {
    applyPreset('balanced');
  };
  
  const saveConfiguration = () => {
    const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
    
    if (Math.abs(totalWeight - 100) > 0.1) {
      toast({
        title: "Invalid Configuration",
        description: `Weights must sum to 100%. Current total: ${totalWeight.toFixed(1)}%`,
        variant: "destructive",
      });
      return;
    }
    
    console.log('Saving configuration:', { factors, activePreset });
    
    toast({
      title: "Configuration Saved",
      description: "Your PulseScore configuration has been saved.",
    });
  };
  
  const remainingWeight = 100 - factors.reduce((sum, factor) => sum + factor.weight, 0);
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">PulseScore™ Admin Control Panel</CardTitle>
            <CardDescription>
              Configure how different factors impact your organization's PulseScore™
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="advanced-mode"
              checked={isAdvancedMode}
              onCheckedChange={setIsAdvancedMode}
            />
            <Label htmlFor="advanced-mode" className="font-medium">
              <Settings className="h-4 w-4 inline mr-1" />
              Advanced Mode
            </Label>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <PresetButtons
            presets={presets}
            activePreset={activePreset}
            onPresetClick={applyPreset}
            onReset={resetToDefault}
          />
          
          <div className="space-y-6">
            {factors.map(factor => (
              <FactorSlider
                key={factor.id}
                factor={factor}
                isAdvancedMode={isAdvancedMode}
                onWeightChange={handleWeightChange}
              />
            ))}
          </div>
          
          {isAdvancedMode && (
            <WeightIndicator remainingWeight={remainingWeight} />
          )}
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={saveConfiguration}
              className="bg-pulse-gradient"
              disabled={isAdvancedMode && Math.abs(remainingWeight) > 0.1}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseScoreAdminPanel;
