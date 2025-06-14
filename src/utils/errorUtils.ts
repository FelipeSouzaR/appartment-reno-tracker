import React from 'react';

interface ErrorInfo {
  message: string;
  stack?: string;
  code?: string;
  context?: string;
}

export const parseError = (error: any): ErrorInfo => {
  if (typeof error === 'string') {
    return { message: error };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      code: (error as any).code,
    };
  }

  if (error?.error?.message) {
    return {
      message: error.error.message,
      code: error.error.code,
    };
  }

  if (error?.message) {
    return {
      message: error.message,
      code: error.code,
    };
  }

  return {
    message: 'Erro desconhecido',
  };
};

export const isNetworkError = (error: any): boolean => {
  return (
    error?.code === 'NETWORK_ERROR' ||
    error?.message?.includes('Network') ||
    error?.message?.includes('fetch') ||
    !navigator.onLine
  );
};

export const isAuthError = (error: any): boolean => {
  return (
    error?.code === 'PGRST301' ||
    error?.code === 'PGRST302' ||
    error?.message?.includes('JWT') ||
    error?.message?.includes('authentication') ||
    error?.message?.includes('unauthorized')
  );
};

export const isValidationError = (error: any): boolean => {
  return (
    error?.code === 'PGRST116' ||
    error?.message?.includes('validation') ||
    error?.message?.includes('constraint')
  );
};

export const getErrorMessage = (error: any): string => {
  const errorInfo = parseError(error);
  
  if (isNetworkError(error)) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
  
  if (isAuthError(error)) {
    return 'Erro de autenticação. Faça login novamente.';
  }
  
  if (isValidationError(error)) {
    return 'Dados inválidos. Verifique os campos e tente novamente.';
  }
  
  return errorInfo.message;
};

export const logError = (error: any, context?: string): void => {
  const errorInfo = parseError(error);
  
  const logData = {
    timestamp: new Date().toISOString(),
    context,
    ...errorInfo,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };
  
  console.error('Error logged:', logData);
  
  // In production, you might want to send this to an error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: sendToErrorTracking(logData);
  }
};

export const createErrorBoundary = (fallbackComponent: React.ComponentType<any>) => {
  return class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      logError(error, 'React Error Boundary');
      console.error('Error boundary caught an error:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return React.createElement(fallbackComponent, { error: this.state.error });
      }

      return this.props.children;
    }
  };
};
