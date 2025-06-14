
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRenovationItems } from '@/hooks/useRenovationItems';
import { useRenovationNavigation } from '@/hooks/useRenovationNavigation';
import { Renovation } from '@/types/renovation';
import RenovationSelector from '@/components/RenovationSelector';
import RenovationSelectorHeader from '@/components/renovation/RenovationSelectorHeader';
import RenovationHeader from '@/components/renovation/RenovationHeader';
import RenovationContent from '@/components/renovation/RenovationContent';

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

        <RenovationContent
          loading={loading}
          showForm={showForm}
          showReports={showReports}
          showCategories={showCategories}
          showSuppliers={showSuppliers}
          items={items}
          editingItem={editingItem}
          onFormSubmit={handleFormSubmit}
          onFormCancel={handleFormCancel}
          onEditItem={showEditForm}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
};

export default RenovationPage;
