
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Settings, Home, Building2 } from 'lucide-react';
import RenovationForm from '@/components/RenovationForm';
import RenovationTable from '@/components/RenovationTable';
import RenovationReports from '@/components/RenovationReports';
import CategoryManagement from '@/components/CategoryManagement';
import SupplierManagement from '@/components/SupplierManagement';
import { useRenovationItems } from '@/hooks/useRenovationItems';
import { RenovationItem } from '@/types/renovation';

const Renovation = () => {
  const { items, loading, createItem, updateItem, deleteItem } = useRenovationItems();
  const [showForm, setShowForm] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSuppliers, setShowSuppliers] = useState(false);
  const [editingItem, setEditingItem] = useState<RenovationItem | null>(null);

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
    setShowReports(false);
    setShowCategories(false);
    setShowSuppliers(false);
  };

  const handleShowReports = () => {
    setShowReports(true);
    setShowForm(false);
    setShowCategories(false);
    setShowSuppliers(false);
    setEditingItem(null);
  };

  const handleShowCategories = () => {
    setShowCategories(true);
    setShowForm(false);
    setShowReports(false);
    setShowSuppliers(false);
    setEditingItem(null);
  };

  const handleShowSuppliers = () => {
    setShowSuppliers(true);
    setShowForm(false);
    setShowReports(false);
    setShowCategories(false);
    setEditingItem(null);
  };

  const handleBackToTable = () => {
    setShowForm(false);
    setShowReports(false);
    setShowCategories(false);
    setShowSuppliers(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: RenovationItem) => {
    setEditingItem(item);
    setShowForm(true);
    setShowReports(false);
    setShowCategories(false);
    setShowSuppliers(false);
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      await deleteItem(id);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);
      } else {
        await createItem(formData);
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const showingManagement = showCategories || showSuppliers;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Gerenciador de Reforma do Apartamento</h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe e gerencie seu projeto de reforma com controle detalhado do orçamento
            </p>
          </div>
          {!showForm && !showReports && !showingManagement && (
            <div className="flex space-x-2">
              <Button onClick={() => window.location.href = '/'} variant="outline" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Button>
              <Button onClick={() => window.location.href = '/configuration'} variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configuração</span>
              </Button>
              <Button onClick={handleShowCategories} variant="outline" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Categorias</span>
              </Button>
              <Button onClick={handleShowSuppliers} variant="outline" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Fornecedores</span>
              </Button>
              <Button onClick={handleShowReports} variant="outline" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Relatórios</span>
              </Button>
              <Button onClick={handleAddItem} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Adicionar Item</span>
              </Button>
            </div>
          )}
          {(showForm || showReports || showingManagement) && (
            <div className="flex space-x-2">
              <Button onClick={() => window.location.href = '/'} variant="outline" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Button>
              <Button onClick={handleBackToTable} variant="outline">
                Voltar à Lista
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : showForm ? (
          <RenovationForm
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isEditing={!!editingItem}
          />
        ) : showReports ? (
          <RenovationReports items={items} />
        ) : showCategories ? (
          <CategoryManagement />
        ) : showSuppliers ? (
          <SupplierManagement />
        ) : (
          <RenovationTable
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
    </div>
  );
};

export default Renovation;
