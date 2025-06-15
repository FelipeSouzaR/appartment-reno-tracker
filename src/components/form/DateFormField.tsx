
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DateFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateFormField: React.FC<DateFormFieldProps> = ({
  id,
  label,
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateFormField;
