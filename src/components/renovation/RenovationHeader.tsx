
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Building2, Settings, FileText, Plus } from 'lucide-react';
import { Renovation } from '@/types/renovation';

interface RenovationHeaderProps {
  renovation: Renovation;
  showForm: boolean;
  showReports: boolean;
  showingManagement: boolean;
  onNavigateHome: () => void;
  onBackToRenovations: () => void;
  onNavigateConfiguration: () => void;
  onShowCategories: () => void;
  onShowSuppliers: () => void;
  onShowReports: () => void;
  onAddItem: () => void;
  onBackToTable: () => void;
}

const RenovationHeader = ({
  renovation,
  showForm,
  showReports,
  showingManagement,
  onNavigateHome,
  onBackToRenovations,
  onNavigateConfiguration,
  onShowCategories,
  onShowSuppliers,
  onShowReports,
  onAddItem,
  onBackToTable,
}: RenovationHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-foreground">{renovation.name}</h1>
        <p className="text-muted-foreground mt-2">
          {renovation.description || 'Acompanhe e gerencie seu projeto de reforma'}
        </p>
      </div>
      {!showForm && !showReports && !showingManagement && (
        <div className="flex space-x-2">
          <Button onClick={onNavigateHome} variant="outline" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Button>
          <Button onClick={onBackToRenovations} variant="outline" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Reformas</span>
          </Button>
          <Button onClick={onNavigateConfiguration} variant="outline" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Configuração</span>
          </Button>
          <Button onClick={onShowCategories} variant="outline" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Categorias</span>
          </Button>
          <Button onClick={onShowSuppliers} variant="outline" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Fornecedores</span>
          </Button>
          <Button onClick={onShowReports} variant="outline" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Relatórios</span>
          </Button>
          <Button onClick={onAddItem} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Adicionar Item</span>
          </Button>
        </div>
      )}
      {(showForm || showReports || showingManagement) && (
        <div className="flex space-x-2">
          <Button onClick={onNavigateHome} variant="outline" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Button>
          <Button onClick={onBackToRenovations} variant="outline" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Reformas</span>
          </Button>
          <Button onClick={onBackToTable} variant="outline">
            Voltar à Lista
          </Button>
        </div>
      )}
    </div>
  );
};

export default RenovationHeader;
