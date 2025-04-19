
import React from 'react';
import { Button } from "@/components/ui/button";
import { RotateCcw, Medal } from 'lucide-react';

interface PresetButtonsProps {
  presets: Array<{
    id: string;
    name: string;
  }>;
  activePreset: string | null;
  onPresetClick: (presetId: string) => void;
  onReset: () => void;
}

export const PresetButtons: React.FC<PresetButtonsProps> = ({
  presets,
  activePreset,
  onPresetClick,
  onReset
}) => {
  return (
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
          onClick={() => onPresetClick(preset.id)}
          className="text-xs"
        >
          {preset.name}
        </Button>
      ))}
      <Button
        variant="outline" 
        size="sm"
        onClick={onReset}
        className="text-xs"
      >
        <RotateCcw className="h-3 w-3 mr-1" />
        Reset
      </Button>
    </div>
  );
};
