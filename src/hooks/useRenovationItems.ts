
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RenovationItem, RenovationFormData } from '@/types/renovation';
import { toast } from '@/hooks/use-toast';

export const useRenovationItems = () => {
  const [items, setItems] = useState<RenovationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('renovation_items')
        .select(`
          *,
          category_data:categories(id, name, description, created_at, updated_at),
          supplier_data:suppliers(id, name, contact_info, phone, email, address, created_at, updated_at)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData: RenovationItem[] = (data || []).map(item => ({
        id: item.id,
        itemNumber: item.item_number,
        category: item.category || '', // Legacy field
        categoryId: item.category_id || '',
        supplier: item.supplier || '', // Legacy field
        supplierId: item.supplier_id || '',
        description: item.description,
        budget: Number(item.budget),
        estimatedPrice: Number(item.estimated_price),
        purchaseDate: item.purchase_date || undefined,
        paidValue: Number(item.paid_value),
        status: item.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: item.payment_method || undefined,
        observations: item.observations || undefined,
        created_at: item.created_at,
        updated_at: item.updated_at,
        category_data: item.category_data ? {
          id: item.category_data.id,
          name: item.category_data.name,
          description: item.category_data.description || undefined,
          created_at: item.category_data.created_at,
          updated_at: item.category_data.updated_at,
        } : undefined,
        supplier_data: item.supplier_data ? {
          id: item.supplier_data.id,
          name: item.supplier_data.name,
          contact_info: item.supplier_data.contact_info || undefined,
          phone: item.supplier_data.phone || undefined,
          email: item.supplier_data.email || undefined,
          address: item.supplier_data.address || undefined,
          created_at: item.supplier_data.created_at,
          updated_at: item.supplier_data.updated_at,
        } : undefined,
      }));

      setItems(transformedData);
    } catch (error) {
      console.error('Error fetching renovation items:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar itens de reforma.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (formData: RenovationFormData) => {
    try {
      const { data, error } = await supabase
        .from('renovation_items')
        .insert({
          item_number: formData.itemNumber,
          category_id: formData.categoryId,
          supplier_id: formData.supplierId,
          description: formData.description,
          budget: formData.budget,
          estimated_price: formData.estimatedPrice,
          purchase_date: formData.purchaseDate || null,
          paid_value: formData.paidValue,
          status: formData.status,
          payment_method: formData.paymentMethod || null,
          observations: formData.observations || null,
          // Keep legacy fields for now
          category: '',
          supplier: '',
        })
        .select(`
          *,
          category_data:categories(id, name, description, created_at, updated_at),
          supplier_data:suppliers(id, name, contact_info, phone, email, address, created_at, updated_at)
        `)
        .single();

      if (error) throw error;
      
      const transformedItem: RenovationItem = {
        id: data.id,
        itemNumber: data.item_number,
        category: data.category || '',
        categoryId: data.category_id || '',
        supplier: data.supplier || '',
        supplierId: data.supplier_id || '',
        description: data.description,
        budget: Number(data.budget),
        estimatedPrice: Number(data.estimated_price),
        purchaseDate: data.purchase_date || undefined,
        paidValue: Number(data.paid_value),
        status: data.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: data.payment_method || undefined,
        observations: data.observations || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at,
        category_data: data.category_data ? {
          id: data.category_data.id,
          name: data.category_data.name,
          description: data.category_data.description || undefined,
          created_at: data.category_data.created_at,
          updated_at: data.category_data.updated_at,
        } : undefined,
        supplier_data: data.supplier_data ? {
          id: data.supplier_data.id,
          name: data.supplier_data.name,
          contact_info: data.supplier_data.contact_info || undefined,
          phone: data.supplier_data.phone || undefined,
          email: data.supplier_data.email || undefined,
          address: data.supplier_data.address || undefined,
          created_at: data.supplier_data.created_at,
          updated_at: data.supplier_data.updated_at,
        } : undefined,
      };

      setItems(prev => [transformedItem, ...prev]);
      toast({
        title: "Sucesso",
        description: "Item de reforma criado com sucesso.",
      });
      return transformedItem;
    } catch (error) {
      console.error('Error creating renovation item:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar item de reforma.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateItem = async (id: string, formData: RenovationFormData) => {
    try {
      const { data, error } = await supabase
        .from('renovation_items')
        .update({
          item_number: formData.itemNumber,
          category_id: formData.categoryId,
          supplier_id: formData.supplierId,
          description: formData.description,
          budget: formData.budget,
          estimated_price: formData.estimatedPrice,
          purchase_date: formData.purchaseDate || null,
          paid_value: formData.paidValue,
          status: formData.status,
          payment_method: formData.paymentMethod || null,
          observations: formData.observations || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select(`
          *,
          category_data:categories(id, name, description, created_at, updated_at),
          supplier_data:suppliers(id, name, contact_info, phone, email, address, created_at, updated_at)
        `)
        .single();

      if (error) throw error;

      const transformedItem: RenovationItem = {
        id: data.id,
        itemNumber: data.item_number,
        category: data.category || '',
        categoryId: data.category_id || '',
        supplier: data.supplier || '',
        supplierId: data.supplier_id || '',
        description: data.description,
        budget: Number(data.budget),
        estimatedPrice: Number(data.estimated_price),
        purchaseDate: data.purchase_date || undefined,
        paidValue: Number(data.paid_value),
        status: data.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: data.payment_method || undefined,
        observations: data.observations || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at,
        category_data: data.category_data ? {
          id: data.category_data.id,
          name: data.category_data.name,
          description: data.category_data.description || undefined,
          created_at: data.category_data.created_at,
          updated_at: data.category_data.updated_at,
        } : undefined,
        supplier_data: data.supplier_data ? {
          id: data.supplier_data.id,
          name: data.supplier_data.name,
          contact_info: data.supplier_data.contact_info || undefined,
          phone: data.supplier_data.phone || undefined,
          email: data.supplier_data.email || undefined,
          address: data.supplier_data.address || undefined,
          created_at: data.supplier_data.created_at,
          updated_at: data.supplier_data.updated_at,
        } : undefined,
      };

      setItems(prev => prev.map(item => item.id === id ? transformedItem : item));
      toast({
        title: "Sucesso",
        description: "Item de reforma atualizado com sucesso.",
      });
      return transformedItem;
    } catch (error) {
      console.error('Error updating renovation item:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar item de reforma.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('renovation_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Sucesso",
        description: "Item de reforma excluído com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting renovation item:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir item de reforma.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refreshItems: fetchItems,
  };
};
