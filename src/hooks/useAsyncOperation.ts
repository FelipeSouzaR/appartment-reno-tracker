
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseAsyncOperationOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useAsyncOperation = (options: UseAsyncOperationOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (operation: () => Promise<any>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      
      if (options.successMessage) {
        toast({
          title: "Sucesso",
          description: options.successMessage,
        });
      }
      
      options.onSuccess?.();
      return result;
    } catch (err) {
      const errorMessage = options.errorMessage || 'Ocorreu um erro inesperado.';
      setError(errorMessage);
      
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      
      options.onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    execute,
    clearError: () => setError(null),
  };
};
