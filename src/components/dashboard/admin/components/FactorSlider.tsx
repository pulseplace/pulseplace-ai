
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Info } from 'lucide-react';
import type { ScoringFactor } from '../data/pulseScoreFactors';

interface FactorSliderProps {
  factor: ScoringFactor;
  isAdvancedMode: boolean;
  onWeightChange: (factorId: string, newValue: number[]) => void;
}

export const FactorSlider: React.FC<FactorSliderProps> = ({
  factor,
  isAdvancedMode,
  onWeightChange,
}) => {
  return (
    <div className="space-y-2">
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
          onValueChange={(value) => onWeightChange(factor.id, value)}
        />
      </div>
      
      <p className="text-xs text-gray-500">{factor.description}</p>
    </div>
  );
};
