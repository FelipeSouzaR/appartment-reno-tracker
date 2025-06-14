
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface UnauthenticatedHeaderProps {
  onAuthClick: () => void;
}

const UnauthenticatedHeader = ({ onAuthClick }: UnauthenticatedHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Gerenciador de Reformas
        </h1>
        <p className="text-lg text-gray-600">
          Organize e acompanhe suas reformas com facilidade
        </p>
      </div>
      <Button onClick={onAuthClick} size="lg" className="flex items-center space-x-2">
        <LogIn className="h-5 w-5" />
        <span>Entrar / Cadastrar</span>
      </Button>
    </div>
  );
};

export default UnauthenticatedHeader;
