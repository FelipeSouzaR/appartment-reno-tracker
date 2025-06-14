
import { useMemo, useRef } from 'react';

// Deep comparison function for complex objects
const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  
  return false;
};

export const useMemoizedValue = <T>(value: T, deps?: React.DependencyList): T => {
  const previousValue = useRef<T>(value);
  const previousDeps = useRef<React.DependencyList | undefined>(deps);

  return useMemo(() => {
    if (deps) {
      // Use provided dependencies
      return value;
    } else {
      // Use deep comparison if no dependencies provided
      if (!deepEqual(previousValue.current, value)) {
        previousValue.current = value;
      }
      return previousValue.current;
    }
  }, deps || [JSON.stringify(value)]);
};
