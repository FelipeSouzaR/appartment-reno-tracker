
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DurationFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DurationFormField: React.FC<DurationFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "ex: 5"
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        <span className="text-sm text-muted-foreground ml-2">- segunda a sexta</span>
      </Label>
      <Input
        id={id}
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DurationFormField;
