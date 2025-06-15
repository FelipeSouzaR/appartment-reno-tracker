
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NumericFormField from '@/components/form/NumericFormField';
import SelectFormField from '@/components/form/SelectFormField';
import { RenovationFormData } from '@/types/renovation';
import { useSuppliers } from '@/hooks/useSuppliers';

interface FinancialSectionProps {
  formData: RenovationFormData;
  displayValues: {
    budget: string;
    estimatedPrice: string;
    paidValue: string;
    estimatedDurationDays: string;
    realDurationDays: string;
  };
  onInputChange: (field: keyof RenovationFormData, value: string | number) => void;
  onNumericInputChange: (field: 'budget' | 'estimatedPrice' | 'paidValue', value: string) => void;
}

const FinancialSection: React.FC<FinancialSectionProps> = ({
  formData,
  displayValues,
  onInputChange,
  onNumericInputChange
}) => {
  const { suppliers, loading: suppliersLoading } = useSuppliers();

  const supplierOptions = suppliers.map(supplier => ({
    value: supplier.id,
    label: supplier.name
  }));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectFormField
          id="supplierId"
          label="Fornecedor"
          value={formData.supplierId}
          onChange={(value) => onInputChange('supplierId', value)}
          placeholder="Selecione um fornecedor"
          options={supplierOptions}
          loading={suppliersLoading}
        />
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
          <Input
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={(e) => onInputChange('paymentMethod', e.target.value)}
            placeholder="ex: Cartão de Crédito, Dinheiro, PIX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumericFormField
          id="budget"
          label="Orçamento/Previsão (R$)"
          value={displayValues.budget}
          onChange={(value) => onNumericInputChange('budget', value)}
        />
        <NumericFormField
          id="estimatedPrice"
          label="Preço Estimado (R$)"
          value={displayValues.estimatedPrice}
          onChange={(value) => onNumericInputChange('estimatedPrice', value)}
        />
        <NumericFormField
          id="paidValue"
          label="Valor Pago (R$)"
          value={displayValues.paidValue}
          onChange={(value) => onNumericInputChange('paidValue', value)}
        />
      </div>
    </>
  );
};

export default FinancialSection;
