
import React from 'react';
import RenovationForm from '@/components/RenovationForm';
import RenovationTable from '@/components/RenovationTable';
import RenovationReports from '@/components/RenovationReports';
import CategoryManagement from '@/components/CategoryManagement';
import SupplierManagement from '@/components/SupplierManagement';
import { RenovationItem } from '@/types/renovation';

interface RenovationContentProps {
  loading: boolean;
  showForm: boolean;
  showReports: boolean;
  showCategories: boolean;
  showSuppliers: boolean;
  items: RenovationItem[];
  editingItem: RenovationItem | null;
  onFormSubmit: (formData: any) => Promise<void>;
  onFormCancel: () => void;
  onEditItem: (item: RenovationItem) => void;
  onDeleteItem: (id: string) => Promise<void>;
}

const RenovationContent = ({
  loading,
  showForm,
  showReports,
  showCategories,
  showSuppliers,
  items,
  editingItem,
  onFormSubmit,
  onFormCancel,
  onEditItem,
  onDeleteItem,
}: RenovationContentProps) => {
  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (showForm) {
    return (
      <RenovationForm
        item={editingItem}
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        isEditing={!!editingItem}
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

  return (
    <RenovationTable
      items={items}
      onEdit={onEditItem}
      onDelete={onDeleteItem}
    />
  );
};

export default RenovationContent;
