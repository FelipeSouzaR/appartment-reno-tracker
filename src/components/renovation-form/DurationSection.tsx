
import React from 'react';
import DurationFormField from '@/components/form/DurationFormField';
import { RenovationFormData } from '@/types/renovation';

interface DurationSectionProps {
  displayValues: {
    estimatedDurationDays: string;
    realDurationDays: string;
  };
  onDurationInputChange: (field: 'estimatedDurationDays' | 'realDurationDays', value: string) => void;
}

const DurationSection: React.FC<DurationSectionProps> = ({
  displayValues,
  onDurationInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DurationFormField
        id="estimatedDurationDays"
        label="Duração Estimada (dias úteis)"
        value={displayValues.estimatedDurationDays}
        onChange={(value) => onDurationInputChange('estimatedDurationDays', value)}
        placeholder="ex: 5"
      />
      <DurationFormField
        id="realDurationDays"
        label="Duração Real (dias úteis)"
        value={displayValues.realDurationDays}
        onChange={(value) => onDurationInputChange('realDurationDays', value)}
        placeholder="ex: 7"
      />
    </div>
  );
};

export default DurationSection;
