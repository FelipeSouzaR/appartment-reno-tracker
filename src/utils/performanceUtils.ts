// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(label: string): () => number {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.recordMetric(label, duration);
      return duration;
    };
  }

  recordMetric(label: string, value: number): void {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    
    const values = this.metrics.get(label)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  getMetrics(label: string): { average: number; min: number; max: number; count: number } | null {
    const values = this.metrics.get(label);
    if (!values || values.length === 0) return null;

    return {
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }

  getAllMetrics(): Record<string, ReturnType<typeof this.getMetrics>> {
    const result: Record<string, ReturnType<typeof this.getMetrics>> = {};
    
    for (const [label] of this.metrics) {
      result[label] = this.getMetrics(label);
    }
    
    return result;
  }

  startObserving(): void {
    if (typeof window === 'undefined') return;

    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.recordMetric('page-load', navEntry.loadEventEnd - navEntry.navigationStart);
          this.recordMetric('dom-content-loaded', navEntry.domContentLoadedEventEnd - navEntry.navigationStart);
        }
      }
    });

    navObserver.observe({ entryTypes: ['navigation'] });
    this.observers.push(navObserver);

    // Observe resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          this.recordMetric(`resource-${resourceEntry.initiatorType}`, resourceEntry.duration);
        }
      }
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.push(resourceObserver);
  }

  stopObserving(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  logSummary(): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('Performance Metrics Summary');
      const allMetrics = this.getAllMetrics();
      
      Object.entries(allMetrics).forEach(([label, metrics]) => {
        if (metrics) {
          console.log(`${label}:`, {
            average: `${metrics.average.toFixed(2)}ms`,
            min: `${metrics.min.toFixed(2)}ms`,
            max: `${metrics.max.toFixed(2)}ms`,
            count: metrics.count,
          });
        }
      });
      
      console.groupEnd();
    }
  }
}

// Export convenience functions
export const performanceMonitor = PerformanceMonitor.getInstance();

export const measureAsync = async <T>(
  label: string,
  asyncFn: () => Promise<T>
): Promise<T> => {
  const endTimer = performanceMonitor.startTimer(label);
  try {
    const result = await asyncFn();
    endTimer();
    return result;
  } catch (error) {
    endTimer();
    throw error;
  }
};

export const measureSync = <T>(
  label: string,
  syncFn: () => T
): T => {
  const endTimer = performanceMonitor.startTimer(label);
  try {
    const result = syncFn();
    endTimer();
    return result;
  } catch (error) {
    endTimer();
    throw error;
  }
};
