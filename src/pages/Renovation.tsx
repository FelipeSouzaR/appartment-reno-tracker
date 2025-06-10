
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Settings, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import RenovationForm from '@/components/RenovationForm';
import RenovationTable from '@/components/RenovationTable';
import RenovationReports from '@/components/RenovationReports';
import { RenovationItem, RenovationFormData } from '@/types/renovation';

const Renovation = () => {
  const [items, setItems] = useState<RenovationItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [editingItem, setEditingItem] = useState<RenovationItem | null>(null);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
    setShowReports(false);
  };

  const handleShowReports = () => {
    setShowReports(true);
    setShowForm(false);
    setEditingItem(null);
  };

  const handleBackToTable = () => {
    setShowForm(false);
    setShowReports(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: RenovationItem) => {
    setEditingItem(item);
    setShowForm(true);
    setShowReports(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item excluído",
      description: "O item de reforma foi excluído com sucesso.",
    });
  };

  const handleFormSubmit = (formData: RenovationFormData) => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id }
          : item
      ));
      toast({
        title: "Item atualizado",
        description: "O item de reforma foi atualizado com sucesso.",
      });
    } else {
      const newItem: RenovationItem = {
        ...formData,
        id: generateId(),
      };
      setItems([...items, newItem]);
      toast({
        title: "Item adicionado",
        description: "O item de reforma foi adicionado com sucesso.",
      });
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

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
          {!showForm && !showReports && (
            <div className="flex space-x-2">
              <Button onClick={() => window.location.href = '/'} variant="outline" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Button>
              <Button onClick={() => window.location.href = '/configuration'} variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configuração</span>
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
          {(showForm || showReports) && (
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

        {showForm ? (
          <RenovationForm
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isEditing={!!editingItem}
          />
        ) : showReports ? (
          <RenovationReports items={items} />
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
