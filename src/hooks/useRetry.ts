
import { useState, useCallback } from 'react';
import { useAsyncOperation } from './useAsyncOperation';

interface UseRetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
  onRetry?: (attempt: number) => void;
}

export const useRetry = (options: UseRetryOptions = {}) => {
  const { maxAttempts = 3, delay = 1000, backoff = true, onRetry } = options;
  const [attempt, setAttempt] = useState(0);
  const { execute, isLoading, error } = useAsyncOperation();

  const retry = useCallback(async (operation: () => Promise<any>) => {
    const executeWithRetry = async (currentAttempt: number): Promise<any> => {
      try {
        setAttempt(currentAttempt);
        return await operation();
      } catch (error) {
        if (currentAttempt < maxAttempts) {
          const delayTime = backoff ? delay * Math.pow(2, currentAttempt - 1) : delay;
          
          onRetry?.(currentAttempt);
          console.log(`Retry attempt ${currentAttempt}/${maxAttempts} in ${delayTime}ms`);
          
          await new Promise(resolve => setTimeout(resolve, delayTime));
          return executeWithRetry(currentAttempt + 1);
        }
        throw error;
      }
    };

    return execute(() => executeWithRetry(1));
  }, [execute, maxAttempts, delay, backoff, onRetry]);

  const reset = useCallback(() => {
    setAttempt(0);
  }, []);

  return {
    retry,
    reset,
    attempt,
    maxAttempts,
    isLoading,
    error,
    canRetry: attempt < maxAttempts,
  };
};
