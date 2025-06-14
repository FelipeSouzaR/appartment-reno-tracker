
import { useState, useCallback, useRef, useEffect } from 'react';

export const useBatchedState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const pendingUpdates = useRef<Partial<T>[]>([]);
  const batchTimeout = useRef<NodeJS.Timeout | null>(null);

  const batchUpdate = useCallback((update: Partial<T> | ((prevState: T) => Partial<T>)) => {
    const updateObject = typeof update === 'function' ? update(state) : update;
    pendingUpdates.current.push(updateObject);

    if (batchTimeout.current) {
      clearTimeout(batchTimeout.current);
    }

    batchTimeout.current = setTimeout(() => {
      if (pendingUpdates.current.length > 0) {
        setState(prevState => {
          let newState = { ...prevState };
          pendingUpdates.current.forEach(update => {
            newState = { ...newState, ...update };
          });
          pendingUpdates.current = [];
          return newState;
        });
      }
      batchTimeout.current = null;
    }, 0);
  }, [state]);

  const setBatchedState = useCallback((newState: T | ((prevState: T) => T)) => {
    if (typeof newState === 'function') {
      setState(newState);
    } else {
      setState(newState);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (batchTimeout.current) {
        clearTimeout(batchTimeout.current);
      }
    };
  }, []);

  return [state, setBatchedState, batchUpdate] as const;
};
