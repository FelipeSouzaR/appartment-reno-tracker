
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import RenovationForm from '@/components/RenovationForm';
import RenovationTable from '@/components/RenovationTable';
import { RenovationItem, RenovationFormData } from '@/types/renovation';

const Renovation = () => {
  const [items, setItems] = useState<RenovationItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RenovationItem | null>(null);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item: RenovationItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The renovation item has been successfully deleted.",
    });
  };

  const handleFormSubmit = (formData: RenovationFormData) => {
    if (editingItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id }
          : item
      ));
      toast({
        title: "Item updated",
        description: "The renovation item has been successfully updated.",
      });
    } else {
      // Add new item
      const newItem: RenovationItem = {
        ...formData,
        id: generateId(),
      };
      setItems([...items, newItem]);
      toast({
        title: "Item added",
        description: "The renovation item has been successfully added.",
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
            <h1 className="text-4xl font-bold text-foreground">Apartment Renovation Manager</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your renovation project with detailed budget control
            </p>
          </div>
          {!showForm && (
            <Button onClick={handleAddItem} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          )}
        </div>

        {showForm ? (
          <RenovationForm
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isEditing={!!editingItem}
          />
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
