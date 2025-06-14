import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RenovationItem, RenovationFormData } from '@/types/renovation';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage, logError } from '@/utils/errorUtils';

export const useRenovationItems = (renovationId?: string) => {
  const [items, setItems] = useState<RenovationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    if (!renovationId) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('renovation_items')
        .select(`
          *,
          category_data:categories(id, name, description, created_at, updated_at),
          supplier_data:suppliers(id, name, contact_info, phone, email, address, created_at, updated_at)
        `)
        .eq('renovation_id', renovationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData: RenovationItem[] = (data || []).map(item => ({
        id: item.id,
        renovation_id: item.renovation_id,
        itemNumber: item.item_number,
        category: item.category || '', // Legacy field
        categoryId: item.category_id || '',
        supplier: item.supplier || '', // Legacy field
        supplierId: item.supplier_id || '',
        description: item.description,
        budget: Number(item.budget),
        estimatedPrice: Number(item.estimated_price),
        purchaseDate: item.purchase_date || undefined,
        plannedDate: item.planned_date || undefined,
        executedDate: item.executed_date || undefined,
        paidValue: Number(item.paid_value),
        status: item.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: item.payment_method || undefined,
        observations: item.observations || undefined,
        estimatedDurationDays: item.estimated_duration_days || undefined,
        realDurationDays: item.real_duration_days || undefined,
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
      logError(error, 'fetch-renovation-items');
      console.error('Error fetching renovation items:', error);
      toast({
        title: "Erro",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (formData: RenovationFormData) => {
    try {
      console.log('Creating item with data:', formData);
      
      // Validate required fields
      if (!formData.renovation_id) {
        throw new Error('ID da reforma é obrigatório');
      }
      
      if (!formData.itemNumber) {
        throw new Error('Número do item é obrigatório');
      }
      
      if (!formData.description) {
        throw new Error('Descrição é obrigatória');
      }

      // Prepare the data for insertion
      const insertData = {
        renovation_id: formData.renovation_id,
        item_number: formData.itemNumber,
        category_id: formData.categoryId || null,
        supplier_id: formData.supplierId || null,
        description: formData.description,
        budget: Number(formData.budget) || 0,
        estimated_price: Number(formData.estimatedPrice) || 0,
        purchase_date: formData.purchaseDate || null,
        planned_date: formData.plannedDate || null,
        executed_date: formData.executedDate || null,
        paid_value: Number(formData.paidValue) || 0,
        status: formData.status || 'Pendente',
        payment_method: formData.paymentMethod || null,
        observations: formData.observations || null,
        estimated_duration_days: formData.estimatedDurationDays || null,
        real_duration_days: formData.realDurationDays || null,
        // Keep legacy fields for compatibility
        category: '',
        supplier: '',
      };

      console.log('Insert data:', insertData);

      const { data, error } = await supabase
        .from('renovation_items')
        .insert(insertData)
        .select(`
          *,
          category_data:categories(id, name, description, created_at, updated_at),
          supplier_data:suppliers(id, name, contact_info, phone, email, address, created_at, updated_at)
        `)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      const transformedItem: RenovationItem = {
        id: data.id,
        renovation_id: data.renovation_id,
        itemNumber: data.item_number,
        category: data.category || '',
        categoryId: data.category_id || '',
        supplier: data.supplier || '',
        supplierId: data.supplier_id || '',
        description: data.description,
        budget: Number(data.budget),
        estimatedPrice: Number(data.estimated_price),
        purchaseDate: data.purchase_date || undefined,
        plannedDate: data.planned_date || undefined,
        executedDate: data.executed_date || undefined,
        paidValue: Number(data.paid_value),
        status: data.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: data.payment_method || undefined,
        observations: data.observations || undefined,
        estimatedDurationDays: data.estimated_duration_days || undefined,
        realDurationDays: data.real_duration_days || undefined,
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
      const errorMessage = getErrorMessage(error);
      logError(error, 'create-renovation-item');
      console.error('Error creating renovation item:', error);
      toast({
        title: "Erro",
        description: `Erro ao criar item de reforma: ${errorMessage}`,
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
          renovation_id: formData.renovation_id,
          item_number: formData.itemNumber,
          category_id: formData.categoryId || null,
          supplier_id: formData.supplierId || null,
          description: formData.description,
          budget: formData.budget,
          estimated_price: formData.estimatedPrice,
          purchase_date: formData.purchaseDate || null,
          planned_date: formData.plannedDate || null,
          executed_date: formData.executedDate || null,
          paid_value: formData.paidValue,
          status: formData.status,
          payment_method: formData.paymentMethod || null,
          observations: formData.observations || null,
          estimated_duration_days: formData.estimatedDurationDays || null,
          real_duration_days: formData.realDurationDays || null,
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
        renovation_id: data.renovation_id,
        itemNumber: data.item_number,
        category: data.category || '',
        categoryId: data.category_id || '',
        supplier: data.supplier || '',
        supplierId: data.supplier_id || '',
        description: data.description,
        budget: Number(data.budget),
        estimatedPrice: Number(data.estimated_price),
        purchaseDate: data.purchase_date || undefined,
        plannedDate: data.planned_date || undefined,
        executedDate: data.executed_date || undefined,
        paidValue: Number(data.paid_value),
        status: data.status as 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado',
        paymentMethod: data.payment_method || undefined,
        observations: data.observations || undefined,
        estimatedDurationDays: data.estimated_duration_days || undefined,
        realDurationDays: data.real_duration_days || undefined,
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
      const errorMessage = getErrorMessage(error);
      logError(error, 'update-renovation-item');
      console.error('Error updating renovation item:', error);
      toast({
        title: "Erro",
        description: `Erro ao atualizar item de reforma: ${errorMessage}`,
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
      const errorMessage = getErrorMessage(error);
      logError(error, 'delete-renovation-item');
      console.error('Error deleting renovation item:', error);
      toast({
        title: "Erro",
        description: `Erro ao excluir item de reforma: ${errorMessage}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchItems();
  }, [renovationId]);

  return {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refreshItems: fetchItems,
  };
};
