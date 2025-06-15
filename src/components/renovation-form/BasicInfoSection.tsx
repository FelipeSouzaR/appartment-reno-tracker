
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SelectFormField from '@/components/form/SelectFormField';
import QuickAddCategoryDialog from '@/components/form/QuickAddCategoryDialog';
import QuickAddSupplierDialog from '@/components/form/QuickAddSupplierDialog';
import { RenovationFormData } from '@/types/renovation';
import { useCategories } from '@/hooks/useCategories';
import { useSuppliers } from '@/hooks/useSuppliers';

interface BasicInfoSectionProps {
  formData: RenovationFormData;
  onInputChange: (field: keyof RenovationFormData, value: string | number) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  const { categories, loading: categoriesLoading, refreshCategories } = useCategories();
  const { suppliers, loading: suppliersLoading, refreshSuppliers } = useSuppliers();
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const supplierOptions = suppliers.map(supplier => ({
    value: supplier.id,
    label: supplier.name
  }));

  const handleCategoryCreated = async (categoryId: string) => {
    await refreshCategories();
    onInputChange('categoryId', categoryId);
  };

  const handleSupplierCreated = async (supplierId: string) => {
    await refreshSuppliers();
    onInputChange('supplierId', supplierId);
  };

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
          showQuickAdd={true}
          onQuickAdd={() => setShowCategoryDialog(true)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <SelectFormField
          id="supplierId"
          label="Fornecedor"
          value={formData.supplierId}
          onChange={(value) => onInputChange('supplierId', value)}
          placeholder="Selecione um fornecedor"
          options={supplierOptions}
          loading={suppliersLoading}
          showQuickAdd={true}
          onQuickAdd={() => setShowSupplierDialog(true)}
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

      <QuickAddCategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        onCategoryCreated={handleCategoryCreated}
      />

      <QuickAddSupplierDialog
        open={showSupplierDialog}
        onOpenChange={setShowSupplierDialog}
        onSupplierCreated={handleSupplierCreated}
      />
    </>
  );
};

export default BasicInfoSection;
