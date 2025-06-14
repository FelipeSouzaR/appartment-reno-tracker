
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useMemo } from 'react';

interface OptimizedQueryOptions<TData, TError = unknown> extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  backgroundRefetch?: boolean;
  optimisticUpdates?: boolean;
}

export const useOptimizedQuery = <TData, TError = unknown>(
  options: OptimizedQueryOptions<TData, TError>
) => {
  const {
    queryKey,
    queryFn,
    backgroundRefetch = true,
    optimisticUpdates = false,
    ...queryOptions
  } = options;

  const optimizedOptions = useMemo(() => ({
    queryKey,
    queryFn,
    staleTime: backgroundRefetch ? 5 * 60 * 1000 : 0, // 5 minutes if background refetch enabled
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: backgroundRefetch,
    refetchOnMount: true,
    refetchOnReconnect: backgroundRefetch,
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...queryOptions,
  }), [queryKey, queryFn, backgroundRefetch, queryOptions]);

  const query = useQuery(optimizedOptions);

  return {
    ...query,
    isOptimized: true,
  };
};

export const useOptimizedInfiniteQuery = <TData, TError = unknown>(
  options: OptimizedQueryOptions<TData, TError> & {
    getNextPageParam: (lastPage: TData, pages: TData[]) => unknown;
    getPreviousPageParam?: (firstPage: TData, pages: TData[]) => unknown;
  }
) => {
  const optimizedOptions = useMemo(() => ({
    ...options,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
  }), [options]);

  return useQuery(optimizedOptions);
};
