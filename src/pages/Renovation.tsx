import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRenovationItems } from '@/hooks/useRenovationItems';
import { useRenovationNavigation } from '@/hooks/useRenovationNavigation';
import { Renovation, RenovationItem } from '@/types/renovation';
import RenovationSelector from '@/components/RenovationSelector';
import RenovationSelectorHeader from '@/components/renovation/RenovationSelectorHeader';
import RenovationHeader from '@/components/renovation/RenovationHeader';
import RenovationTable from '@/components/RenovationTable';
import RenovationForm from '@/components/RenovationForm';
import RenovationReports from '@/components/RenovationReports';
import CategoryManagement from '@/components/CategoryManagement';
import SupplierManagement from '@/components/SupplierManagement';
import { Skeleton } from '@/components/ui/skeleton';

const RenovationPage = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedRenovation, setSelectedRenovation] = useState<Renovation | null>(null);
  const { items, loading, createItem, updateItem, deleteItem } = useRenovationItems(selectedRenovation?.id);
  const {
    showForm,
    showReports,
    showCategories,
    showSuppliers,
    editingItem,
    showingManagement,
    resetViews,
    showAddForm,
    showReportsView,
    showCategoriesView,
    showSuppliersView,
    showEditForm,
  } = useRenovationNavigation();
  const [newItemNumber, setNewItemNumber] = useState('');

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleAddItem = () => {
    if (!selectedRenovation) return;
    const maxItemNumber = Math.max(0, ...items.map(i => parseInt(i.itemNumber, 10) || 0));
    const nextItemNumber = (maxItemNumber + 1).toString().padStart(3, '0');
    setNewItemNumber(nextItemNumber);
    showAddForm();
  };

  const handleBackToRenovations = () => {
    setSelectedRenovation(null);
    resetViews();
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      await deleteItem(id);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      const itemData = {
        ...formData,
        renovation_id: selectedRenovation!.id,
      };
      
      if (editingItem) {
        await updateItem(editingItem.id, itemData);
      } else {
        await createItem(itemData);
      }
      resetViews();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleFormCancel = () => {
    resetViews();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!selectedRenovation) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <RenovationSelectorHeader 
            user={user}
            profile={profile}
            onNavigateHome={() => navigate('/')}
            onSignOut={handleSignOut}
          />
          <RenovationSelector 
            onSelectRenovation={setSelectedRenovation}
            selectedRenovation={selectedRenovation}
          />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      );
    }

    if (showForm) {
      return (
        <RenovationForm
          key={editingItem ? editingItem.id : 'new'}
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isEditing={!!editingItem}
          newItemNumber={newItemNumber}
        />
      );
    }

    if (showReports) {
      return <RenovationReports items={items} />;
    }

    if (showCategories) {
      return <CategoryManagement />;
    }
    
    if (showSuppliers) {
      return <SupplierManagement />;
    }

    return <RenovationTable items={items} onEdit={showEditForm} onDelete={handleDeleteItem} />;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <RenovationHeader
          renovation={selectedRenovation}
          showForm={showForm}
          showReports={showReports}
          showingManagement={showingManagement}
          onNavigateHome={() => navigate('/')}
          onBackToRenovations={handleBackToRenovations}
          onNavigateConfiguration={() => navigate('/configuration')}
          onShowCategories={showCategoriesView}
          onShowSuppliers={showSuppliersView}
          onShowReports={showReportsView}
          onAddItem={handleAddItem}
          onBackToTable={resetViews}
        />

        {renderContent()}
      </div>
    </div>
  );
};

export default RenovationPage;
