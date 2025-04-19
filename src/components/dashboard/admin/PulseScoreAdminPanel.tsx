
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  RotateCcw, 
  Info, 
  Settings, 
  BarChart,
  Medal,
  Lightbulb,
  HandsClapping,
  Users,
  Shield,
  Briefcase,
  Heart
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ScoringFactor {
  id: string;
  name: string;
  description: string;
  weight: number;
  icon: React.ReactNode;
}

interface ScorePreset {
  id: string;
  name: string;
  description: string;
  weights: Record<string, number>;
}

const PulseScoreAdminPanel: React.FC = () => {
  const { toast } = useToast();
  
  // Scoring factors with default weights
  const [factors, setFactors] = useState<ScoringFactor[]>([
    {
      id: 'engagement',
      name: 'Engagement',
      description: 'Overall employee engagement and commitment',
      weight: 15,
      icon: <HandsClapping className="h-4 w-4" />
    },
    {
      id: 'trust',
      name: 'Trust',
      description: 'Trust in leadership and organization',
      weight: 15,
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 'dei',
      name: 'Diversity & Inclusion',
      description: 'Diversity, equity and inclusion measures',
      weight: 15,
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'growth',
      name: 'Growth & Development',
      description: 'Career development opportunities',
      weight: 10,
      icon: <BarChart className="h-4 w-4" />
    },
    {
      id: 'innovation',
      name: 'Innovation',
      description: 'Fostering creativity and innovation',
      weight: 10,
      icon: <Lightbulb className="h-4 w-4" />
    },
    {
      id: 'recognition',
      name: 'Recognition',
      description: 'Recognizing employee contributions',
      weight: 10,
      icon: <Medal className="h-4 w-4" />
    },
    {
      id: 'worklife',
      name: 'Work-Life Balance',
      description: 'Healthy work-life integration',
      weight: 15,
      icon: <Heart className="h-4 w-4" />
    },
    {
      id: 'purpose',
      name: 'Purpose & Mission',
      description: 'Alignment with company mission',
      weight: 10,
      icon: <Briefcase className="h-4 w-4" />
    }
  ]);
  
  // Presets for quick configuration
  const presets: ScorePreset[] = [
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
  
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  
  // Handle slider change
  const handleWeightChange = (factorId: string, newValue: number[]) => {
    setFactors(prev => prev.map(factor => 
      factor.id === factorId ? {...factor, weight: newValue[0]} : factor
    ));
    // When manually changing weights, deselect any preset
    setActivePreset(null);
  };
  
  // Apply a preset
  const applyPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    
    setFactors(prev => prev.map(factor => ({
      ...factor,
      weight: preset.weights[factor.id] || factor.weight
    })));
    
    setActivePreset(presetId);
    
    toast({
      title: "Preset Applied",
      description: `${preset.name} preset has been applied to scoring factors.`,
    });
  };
  
  // Reset to default weights
  const resetToDefault = () => {
    applyPreset('balanced');
  };
  
  // Save configuration
  const saveConfiguration = () => {
    // Check if weights sum to 100%
    const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
    
    if (Math.abs(totalWeight - 100) > 0.1) {
      toast({
        title: "Invalid Configuration",
        description: `Weights must sum to 100%. Current total: ${totalWeight.toFixed(1)}%`,
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically save to a database
    console.log('Saving configuration:', { factors, activePreset });
    
    toast({
      title: "Configuration Saved",
      description: "Your PulseScore configuration has been saved.",
    });
  };
  
  // Calculate remaining weight (for advanced mode)
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
          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium flex items-center mr-2">
              <Medal className="h-4 w-4 mr-1" />
              Presets:
            </span>
            {presets.map(preset => (
              <Button
                key={preset.id}
                variant={activePreset === preset.id ? "default" : "outline"}
                size="sm"
                onClick={() => applyPreset(preset.id)}
                className="text-xs"
              >
                {preset.name}
              </Button>
            ))}
            <Button
              variant="outline" 
              size="sm"
              onClick={resetToDefault}
              className="text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
          
          {/* Sliders for each factor */}
          <div className="space-y-6">
            {factors.map(factor => (
              <div key={factor.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {factor.icon}
                    <Label className="font-medium">{factor.name}</Label>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </div>
                  <div className="text-sm font-medium">{factor.weight}%</div>
                </div>
                
                <div className="px-1">
                  <Slider
                    value={[factor.weight]}
                    min={0}
                    max={isAdvancedMode ? 100 : 25}
                    step={1}
                    onValueChange={(value) => handleWeightChange(factor.id, value)}
                  />
                </div>
                
                <p className="text-xs text-gray-500">{factor.description}</p>
              </div>
            ))}
          </div>
          
          {/* Weight total indicator (for advanced mode) */}
          {isAdvancedMode && (
            <div className={`text-sm font-medium p-2 rounded ${
              Math.abs(remainingWeight) < 0.1 
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              Total: {(100 - remainingWeight).toFixed(1)}% 
              {Math.abs(remainingWeight) < 0.1 
                ? ' (Valid)' 
                : ` (${remainingWeight > 0 ? remainingWeight.toFixed(1) + '% Remaining' : 'Exceeds 100%'})`
              }
            </div>
          )}
          
          {/* Save button */}
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
