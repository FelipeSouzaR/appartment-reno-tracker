
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RenovationFormData, RenovationItem } from '@/types/renovation';
import { useRenovationForm } from '@/hooks/useRenovationForm';
import BasicInfoSection from '@/components/renovation-form/BasicInfoSection';
import FinancialSection from '@/components/renovation-form/FinancialSection';
import ScheduleSection from '@/components/renovation-form/ScheduleSection';
import DurationSection from '@/components/renovation-form/DurationSection';
import AdditionalInfoSection from '@/components/renovation-form/AdditionalInfoSection';

interface RenovationFormProps {
  item?: RenovationItem;
  onSubmit: (data: RenovationFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
  newItemNumber?: string;
}

const RenovationForm: React.FC<RenovationFormProps> = ({ item, onSubmit, onCancel, isEditing, newItemNumber }) => {
  const {
    formData,
    displayValues,
    handleSubmit,
    handleInputChange,
    handleNumericInputChange,
    handleDurationInputChange,
  } = useRenovationForm({ item, onSubmit, onCancel, isEditing, newItemNumber });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {isEditing ? 'Editar Item de Reforma' : 'Adicionar Novo Item de Reforma'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <FinancialSection
            formData={formData}
            displayValues={displayValues}
            onInputChange={handleInputChange}
            onNumericInputChange={handleNumericInputChange}
          />

          <ScheduleSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <DurationSection
            displayValues={displayValues}
            onDurationInputChange={handleDurationInputChange}
          />

          <AdditionalInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {isEditing ? 'Atualizar Item' : 'Adicionar Item'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RenovationForm;
