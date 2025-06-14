
import { useState } from 'react';
import { RenovationItem } from '@/types/renovation';

export const useRenovationNavigation = () => {
  const [showForm, setShowForm] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSuppliers, setShowSuppliers] = useState(false);
  const [editingItem, setEditingItem] = useState<RenovationItem | null>(null);

  const resetViews = () => {
    setShowForm(false);
    setShowReports(false);
    setShowCategories(false);
    setShowSuppliers(false);
    setEditingItem(null);
  };

  const showAddForm = () => {
    setEditingItem(null);
    setShowForm(true);
    setShowReports(false);
    setShowCategories(false);
    setShowSuppliers(false);
  };

  const showReportsView = () => {
    setShowReports(true);
    setShowForm(false);
    setShowCategories(false);
    setShowSuppliers(false);
    setEditingItem(null);
  };

  const showCategoriesView = () => {
    setShowCategories(true);
    setShowForm(false);
    setShowReports(false);
    setShowSuppliers(false);
    setEditingItem(null);
  };

  const showSuppliersView = () => {
    setShowSuppliers(true);
    setShowForm(false);
    setShowReports(false);
    setShowCategories(false);
    setEditingItem(null);
  };

  const showEditForm = (item: RenovationItem) => {
    setEditingItem(item);
    setShowForm(true);
    setShowReports(false);
    setShowCategories(false);
    setShowSuppliers(false);
  };

  const showingManagement = showCategories || showSuppliers;

  return {
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
  };
};
