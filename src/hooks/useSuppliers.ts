
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Supplier, SupplierFormData } from '@/types/renovation';
import { toast } from '@/hooks/use-toast';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');

      if (error) throw error;
      setSuppliers(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar fornecedores.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (formData: SupplierFormData) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;
      
      setSuppliers(prev => [...prev, data]);
      toast({
        title: "Sucesso",
        description: "Fornecedor criado com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error creating supplier:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar fornecedor.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSupplier = async (id: string, formData: SupplierFormData) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSuppliers(prev => prev.map(sup => sup.id === id ? data : sup));
      toast({
        title: "Sucesso",
        description: "Fornecedor atualizado com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error updating supplier:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar fornecedor.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuppliers(prev => prev.filter(sup => sup.id !== id));
      toast({
        title: "Sucesso",
        description: "Fornecedor excluído com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir fornecedor.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    loading,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    refreshSuppliers: fetchSuppliers,
  };
};
