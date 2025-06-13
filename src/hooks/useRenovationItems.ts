
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
          category_data:categories(id, name, description),
          supplier_data:suppliers(id, name, contact_info, phone, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData = (data || []).map(item => ({
        id: item.id,
        itemNumber: item.item_number,
        category: item.category, // Legacy field
        categoryId: item.category_id,
        supplier: item.supplier, // Legacy field
        supplierId: item.supplier_id,
        description: item.description,
        budget: Number(item.budget),
        estimatedPrice: Number(item.estimated_price),
        purchaseDate: item.purchase_date,
        paidValue: Number(item.paid_value),
        status: item.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: item.payment_method,
        observations: item.observations,
        created_at: item.created_at,
        updated_at: item.updated_at,
        category_data: item.category_data,
        supplier_data: item.supplier_data,
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
        .insert([{
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
        }])
        .select(`
          *,
          category_data:categories(id, name, description),
          supplier_data:suppliers(id, name, contact_info, phone, email)
        `)
        .single();

      if (error) throw error;
      
      const transformedItem = {
        id: data.id,
        itemNumber: data.item_number,
        categoryId: data.category_id,
        supplierId: data.supplier_id,
        description: data.description,
        budget: Number(data.budget),
        estimatedPrice: Number(data.estimated_price),
        purchaseDate: data.purchase_date,
        paidValue: Number(data.paid_value),
        status: data.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: data.payment_method,
        observations: data.observations,
        created_at: data.created_at,
        updated_at: data.updated_at,
        category_data: data.category_data,
        supplier_data: data.supplier_data,
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
          category_data:categories(id, name, description),
          supplier_data:suppliers(id, name, contact_info, phone, email)
        `)
        .single();

      if (error) throw error;

      const transformedItem = {
        id: data.id,
        itemNumber: data.item_number,
        categoryId: data.category_id,
        supplierId: data.supplier_id,
        description: data.description,
        budget: Number(data.budget),
        estimatedPrice: Number(data.estimated_price),
        purchaseDate: data.purchase_date,
        paidValue: Number(data.paid_value),
        status: data.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: data.payment_method,
        observations: data.observations,
        created_at: data.created_at,
        updated_at: data.updated_at,
        category_data: data.category_data,
        supplier_data: data.supplier_data,
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
