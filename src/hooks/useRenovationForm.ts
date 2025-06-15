import { useState } from 'react';
import { RenovationFormData, RenovationItem } from '@/types/renovation';

interface UseRenovationFormProps {
  item?: RenovationItem;
  onSubmit: (data: RenovationFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const useRenovationForm = ({ item, onSubmit, onCancel, isEditing }: UseRenovationFormProps) => {
  const [formData, setFormData] = useState<RenovationFormData>({
    renovation_id: item?.renovation_id || '',
    itemNumber: item?.itemNumber || '',
    categoryId: item?.categoryId || '',
    supplierId: item?.supplierId || '',
    description: item?.description || '',
    budget: item?.budget || 0,
    estimatedPrice: item?.estimatedPrice || 0,
    purchaseDate: item?.purchaseDate || '',
    plannedDate: item?.plannedDate || '',
    executedDate: item?.executedDate || '',
    paidValue: item?.paidValue || 0,
    status: item?.status || 'Pendente',
    paymentMethod: item?.paymentMethod || '',
    observations: item?.observations || '',
    estimatedDurationDays: item?.estimatedDurationDays || undefined,
    realDurationDays: item?.realDurationDays || undefined,
  });

  // Display values for numeric fields (strings when empty)
  const [displayValues, setDisplayValues] = useState({
    budget: item?.budget ? item.budget.toString() : '',
    estimatedPrice: item?.estimatedPrice ? item.estimatedPrice.toString() : '',
    paidValue: item?.paidValue ? item.paidValue.toString() : '',
    estimatedDurationDays: item?.estimatedDurationDays ? item.estimatedDurationDays.toString() : '',
    realDurationDays: item?.realDurationDays ? item.realDurationDays.toString() : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.itemNumber.trim()) {
      alert('Número do item é obrigatório');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Descrição é obrigatória');
      return;
    }
    
    // Convert special placeholder values back to empty strings
    const submissionData = {
      ...formData,
      categoryId: formData.categoryId === 'none' ? '' : formData.categoryId,
      supplierId: formData.supplierId === 'none' ? '' : formData.supplierId,
    };
    
    console.log('Form data being submitted:', submissionData);
    onSubmit(submissionData);
  };

  const handleInputChange = (field: keyof RenovationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericInputChange = (field: 'budget' | 'estimatedPrice' | 'paidValue', value: string) => {
    // Update display value
    setDisplayValues(prev => ({ ...prev, [field]: value }));
    
    // Convert to number or keep 0 if empty
    const numericValue = value === '' ? 0 : parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const handleDurationInputChange = (field: 'estimatedDurationDays' | 'realDurationDays', value: string) => {
    // Update display value
    setDisplayValues(prev => ({ ...prev, [field]: value }));
    
    // Convert to number or keep undefined if empty
    const numericValue = value === '' ? undefined : parseInt(value) || undefined;
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  return {
    formData,
    displayValues,
    handleSubmit,
    handleInputChange,
    handleNumericInputChange,
    handleDurationInputChange,
    onCancel,
    isEditing,
  };
};
