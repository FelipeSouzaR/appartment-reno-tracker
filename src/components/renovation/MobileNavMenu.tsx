
import React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu, Home, Building2, FileText, Plus } from 'lucide-react';
import ConfigurationDropdown from './ConfigurationDropdown';

interface MobileNavMenuProps {
  onNavigateHome: () => void;
  onBackToRenovations: () => void;
  onNavigateConfiguration: () => void;
  onShowCategories: () => void;
  onShowSuppliers: () => void;
  onShowReports: () => void;
  onAddItem: () => void;
}

const MobileNavMenu = ({
  onNavigateHome,
  onBackToRenovations,
  onNavigateConfiguration,
  onShowCategories,
  onShowSuppliers,
  onShowReports,
  onAddItem,
}: MobileNavMenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4 space-y-4">
          <Button onClick={onNavigateHome} variant="outline" className="w-full flex items-center justify-start space-x-2">
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Button>
          <Button onClick={onBackToRenovations} variant="outline" className="w-full flex items-center justify-start space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Reformas</span>
          </Button>
          <div className="w-full">
            <ConfigurationDropdown
              onNavigateConfiguration={onNavigateConfiguration}
              onShowCategories={onShowCategories}
              onShowSuppliers={onShowSuppliers}
            />
          </div>
          <Button onClick={onShowReports} variant="outline" className="w-full flex items-center justify-start space-x-2">
            <FileText className="h-4 w-4" />
            <span>Relatórios</span>
          </Button>
          <Button onClick={onAddItem} className="w-full flex items-center justify-start space-x-2">
            <Plus className="h-4 w-4" />
            <span>Adicionar Item</span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavMenu;
