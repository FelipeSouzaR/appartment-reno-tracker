
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, CategoryFormData } from '@/types/renovation';
import { toast } from '@/hooks/use-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar categorias.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (formData: CategoryFormData) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;
      
      setCategories(prev => [...prev, data]);
      toast({
        title: "Sucesso",
        description: "Categoria criada com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar categoria.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCategory = async (id: string, formData: CategoryFormData) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => prev.map(cat => cat.id === id ? data : cat));
      toast({
        title: "Sucesso",
        description: "Categoria atualizada com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar categoria.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir categoria.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories,
  };
};
