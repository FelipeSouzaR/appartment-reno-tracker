
import { useState, useCallback } from 'react';

export const useLoadingState = (initialLoading = false) => {
  const [loading, setLoading] = useState(initialLoading);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setGlobalLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
  }, []);

  const setLoadingState = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading,
    }));
  }, []);

  const isAnyLoading = useCallback(() => {
    return loading || Object.values(loadingStates).some(Boolean);
  }, [loading, loadingStates]);

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates[key] || false;
    }
    return loading;
  }, [loading, loadingStates]);

  const withLoading = useCallback(async <T>(
    operation: () => Promise<T>,
    key?: string
  ): Promise<T> => {
    try {
      if (key) {
        setLoadingState(key, true);
      } else {
        setGlobalLoading(true);
      }
      
      return await operation();
    } finally {
      if (key) {
        setLoadingState(key, false);
      } else {
        setGlobalLoading(false);
      }
    }
  }, [setGlobalLoading, setLoadingState]);

  return {
    loading,
    loadingStates,
    setGlobalLoading,
    setLoadingState,
    isAnyLoading,
    isLoading,
    withLoading,
  };
};
