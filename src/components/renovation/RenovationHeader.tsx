
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Building2, FileText, Plus } from 'lucide-react';
import { Renovation } from '@/types/renovation';
import ConfigurationDropdown from './ConfigurationDropdown';
import MobileNavMenu from './MobileNavMenu';

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground truncate">{renovation.name}</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          {renovation.description || 'Acompanhe e gerencie seu projeto de reforma'}
        </p>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        {!showForm && !showReports && !showingManagement ? (
          <div className="flex justify-between items-center">
            <MobileNavMenu
              onNavigateHome={onNavigateHome}
              onBackToRenovations={onBackToRenovations}
              onNavigateConfiguration={onNavigateConfiguration}
              onShowCategories={onShowCategories}
              onShowSuppliers={onShowSuppliers}
              onShowReports={onShowReports}
              onAddItem={onAddItem}
            />
            <Button onClick={onAddItem} className="flex items-center space-x-2 ml-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar</span>
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={onNavigateHome} variant="outline" size="sm">
              <Home className="h-4 w-4" />
            </Button>
            <Button onClick={onBackToRenovations} variant="outline" size="sm">
              <Building2 className="h-4 w-4" />
            </Button>
            <Button onClick={onBackToTable} variant="outline" size="sm">
              Voltar
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:block">
        {!showForm && !showReports && !showingManagement ? (
          <div className="flex flex-wrap gap-2">
            <Button onClick={onNavigateHome} variant="outline" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Button>
            <Button onClick={onBackToRenovations} variant="outline" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Reformas</span>
            </Button>
            <ConfigurationDropdown
              onNavigateConfiguration={onNavigateConfiguration}
              onShowCategories={onShowCategories}
              onShowSuppliers={onShowSuppliers}
            />
            <Button onClick={onShowReports} variant="outline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Relatórios</span>
            </Button>
            <Button onClick={onAddItem} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar Item</span>
            </Button>
          </div>
        ) : (
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
    </div>
  );
};

export default RenovationHeader;
