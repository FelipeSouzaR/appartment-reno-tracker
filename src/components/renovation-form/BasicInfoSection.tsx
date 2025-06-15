
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SelectFormField from '@/components/form/SelectFormField';
import { RenovationFormData } from '@/types/renovation';
import { useCategories } from '@/hooks/useCategories';

interface BasicInfoSectionProps {
  formData: RenovationFormData;
  onInputChange: (field: keyof RenovationFormData, value: string | number) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  const { categories, loading: categoriesLoading } = useCategories();

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="itemNumber">Número do Item</Label>
          <Input
            id="itemNumber"
            value={formData.itemNumber}
            readOnly
            className="bg-muted"
            placeholder="Será gerado automaticamente"
          />
        </div>
        <SelectFormField
          id="categoryId"
          label="Categoria"
          value={formData.categoryId}
          onChange={(value) => onInputChange('categoryId', value)}
          placeholder="Selecione uma categoria"
          options={categoryOptions}
          loading={categoriesLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Item *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Descrição detalhada do item de reforma"
          required
          rows={3}
        />
      </div>
    </>
  );
};

export default BasicInfoSection;
