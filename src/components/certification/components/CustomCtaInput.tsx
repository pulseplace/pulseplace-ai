
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomCtaInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomCtaInput: React.FC<CustomCtaInputProps> = ({
  value,
  onChange
}) => {
  return (
    <div>
      <Label htmlFor="customCta">Custom Badge Message (Optional)</Label>
      <Input
        id="customCta"
        placeholder="e.g., We're Pulse Certified!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1"
      />
    </div>
  );
};

export default CustomCtaInput;
