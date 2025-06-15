
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
  onQuickAdd?: () => void;
  showQuickAdd?: boolean;
}

const SelectFormField: React.FC<SelectFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  loading = false,
  onQuickAdd,
  showQuickAdd = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex space-x-2">
        <Select value={value || 'none'} onValueChange={onChange}>
          <SelectTrigger className="flex-1">
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
        {showQuickAdd && onQuickAdd && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onQuickAdd}
            className="shrink-0"
            title={`Adicionar novo ${label.toLowerCase()}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelectFormField;
