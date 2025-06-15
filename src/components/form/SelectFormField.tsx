
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  loading?: boolean;
}

const SelectFormField: React.FC<SelectFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  loading = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value || 'none'} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Nenhuma opção</SelectItem>
          {loading ? (
            <SelectItem value="loading" disabled>Carregando...</SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectFormField;
