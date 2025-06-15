
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SelectFormField from '@/components/form/SelectFormField';
import { RenovationFormData } from '@/types/renovation';

interface AdditionalInfoSectionProps {
  formData: RenovationFormData;
  onInputChange: (field: keyof RenovationFormData, value: string | number) => void;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  const statusOptions = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em Andamento', label: 'Em Andamento' },
    { value: 'Concluído', label: 'Concluído' },
    { value: 'Cancelado', label: 'Cancelado' },
  ];

  return (
    <>
      <SelectFormField
        id="status"
        label="Status"
        value={formData.status}
        onChange={(value) => onInputChange('status', value)}
        placeholder="Selecione o status"
        options={statusOptions}
      />

      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea
          id="observations"
          value={formData.observations}
          onChange={(e) => onInputChange('observations', e.target.value)}
          placeholder="Notas adicionais ou observações"
          rows={3}
        />
      </div>
    </>
  );
};

export default AdditionalInfoSection;
