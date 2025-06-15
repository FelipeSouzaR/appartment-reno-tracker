
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, Building2, Truck } from 'lucide-react';

interface ConfigurationDropdownProps {
  onNavigateConfiguration: () => void;
  onShowCategories: () => void;
  onShowSuppliers: () => void;
}

const ConfigurationDropdown = ({
  onNavigateConfiguration,
  onShowCategories,
  onShowSuppliers,
}: ConfigurationDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background">
        <DropdownMenuItem onClick={onNavigateConfiguration} className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Configuração Geral</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShowCategories} className="flex items-center space-x-2">
          <Building2 className="h-4 w-4" />
          <span>Categorias</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShowSuppliers} className="flex items-center space-x-2">
          <Truck className="h-4 w-4" />
          <span>Fornecedores</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConfigurationDropdown;
