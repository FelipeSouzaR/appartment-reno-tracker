import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
}

export const usePerformance = (componentName: string) => {
  const renderCount = useRef(0);
  const renderTimes = useRef<number[]>([]);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    renderCount.current += 1;
    renderTimes.current.push(renderTime);
    
    // Keep only last 10 render times for average calculation
    if (renderTimes.current.length > 10) {
      renderTimes.current.shift();
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
    }

    startTime.current = performance.now();
  });

  const getMetrics = useCallback((): PerformanceMetrics => {
    const averageRenderTime = renderTimes.current.length > 0
      ? renderTimes.current.reduce((sum, time) => sum + time, 0) / renderTimes.current.length
      : 0;

    return {
      renderCount: renderCount.current,
      lastRenderTime: renderTimes.current[renderTimes.current.length - 1] || 0,
      averageRenderTime,
    };
  }, []);

  return { getMetrics };
};
