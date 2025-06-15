
import React from 'react';
import DateFormField from '@/components/form/DateFormField';
import { RenovationFormData } from '@/types/renovation';

interface ScheduleSectionProps {
  formData: RenovationFormData;
  onInputChange: (field: keyof RenovationFormData, value: string | number) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DateFormField
        id="plannedDate"
        label="Data Planejada"
        value={formData.plannedDate || ''}
        onChange={(value) => onInputChange('plannedDate', value)}
      />
      <DateFormField
        id="executedDate"
        label="Data de Início da Execução"
        value={formData.executedDate || ''}
        onChange={(value) => onInputChange('executedDate', value)}
      />
      <DateFormField
        id="purchaseDate"
        label="Data da Compra"
        value={formData.purchaseDate || ''}
        onChange={(value) => onInputChange('purchaseDate', value)}
      />
    </div>
  );
};

export default ScheduleSection;
