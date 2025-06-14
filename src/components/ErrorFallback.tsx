
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  onRetry,
  title = "Algo deu errado",
  description = "Ocorreu um erro inesperado. Tente novamente.",
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && process.env.NODE_ENV === 'development' && (
            <div className="rounded bg-gray-100 p-3 text-sm text-gray-600">
              <p className="font-semibold">Erro técnico:</p>
              <p className="mt-1 font-mono text-xs">{error.message}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {onRetry && (
              <Button onClick={onRetry} variant="default" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
            )}
            <Button onClick={handleReload} variant="outline" className="w-full">
              Recarregar Página
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
