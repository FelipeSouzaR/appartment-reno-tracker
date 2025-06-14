
import { useState } from 'react';

export const useFormState = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: '' }));
    }
  };

  const setFieldError = (field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field as string]: error }));
  };

  const clearErrors = () => setErrors({});

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    errors,
    setErrors,
    updateField,
    setFieldError,
    clearErrors,
    resetForm,
  };
};
