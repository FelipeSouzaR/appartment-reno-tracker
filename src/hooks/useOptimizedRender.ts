
import { useCallback, useMemo, useRef } from 'react';

interface OptimizedCallbacks<T = any> {
  [key: string]: (...args: any[]) => T;
}

export const useOptimizedCallbacks = <T extends OptimizedCallbacks>(
  callbacks: T,
  deps: React.DependencyList = []
): T => {
  const memoizedCallbacks = useMemo(() => {
    const optimized: any = {};
    
    Object.keys(callbacks).forEach(key => {
      optimized[key] = useCallback(callbacks[key], deps);
    });
    
    return optimized;
  }, [callbacks, ...deps]);

  return memoizedCallbacks;
};

export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList = []
): T => {
  const callbackRef = useRef(callback);
  
  // Update the callback ref when dependencies change
  useMemo(() => {
    callbackRef.current = callback;
  }, deps);

  // Return a stable callback that always calls the latest version
  const stableCallback = useCallback(
    (...args: Parameters<T>) => callbackRef.current(...args),
    []
  ) as T;

  return stableCallback;
};

export const useShallowMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  const previousDeps = useRef<React.DependencyList>();
  const previousValue = useRef<T>();

  const hasChanged = !previousDeps.current || 
    deps.length !== previousDeps.current.length ||
    deps.some((dep, index) => dep !== previousDeps.current![index]);

  if (hasChanged) {
    previousValue.current = factory();
    previousDeps.current = deps;
  }

  return previousValue.current!;
};
