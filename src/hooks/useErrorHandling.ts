
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface ErrorState {
  message: string;
  details?: any;
  timestamp: Date;
}

export const useErrorHandling = () => {
  const [errors, setErrors] = useState<Record<string, ErrorState>>({});
  const [globalError, setGlobalError] = useState<ErrorState | null>(null);

  const handleError = useCallback((
    error: any,
    context?: string,
    showToast = true
  ) => {
    const errorMessage = error?.message || 'Ocorreu um erro inesperado';
    const errorState: ErrorState = {
      message: errorMessage,
      details: error,
      timestamp: new Date(),
    };

    if (context) {
      setErrors(prev => ({
        ...prev,
        [context]: errorState,
      }));
    } else {
      setGlobalError(errorState);
    }

    if (showToast) {
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    }

    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  }, []);

  const clearError = useCallback((context?: string) => {
    if (context) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[context];
        return newErrors;
      });
    } else {
      setGlobalError(null);
    }
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
    setGlobalError(null);
  }, []);

  const hasError = useCallback((context?: string) => {
    if (context) {
      return !!errors[context];
    }
    return !!globalError || Object.keys(errors).length > 0;
  }, [errors, globalError]);

  const getError = useCallback((context?: string) => {
    if (context) {
      return errors[context] || null;
    }
    return globalError;
  }, [errors, globalError]);

  return {
    errors,
    globalError,
    handleError,
    clearError,
    clearAllErrors,
    hasError,
    getError,
  };
};
