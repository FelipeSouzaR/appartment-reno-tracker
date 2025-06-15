
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Supplier, SupplierFormData } from '@/types/renovation';
import { toast } from '@/hooks/use-toast';

const fetchSuppliers = async (): Promise<Supplier[]> => {
  const { data, error } = await supabase.from('suppliers').select('*').order('name');
  if (error) throw error;
  return data || [];
};

const createSupplierFn = async (formData: SupplierFormData): Promise<Supplier> => {
  const { data, error } = await supabase.from('suppliers').insert([formData]).select().single();
  if (error) throw error;
  return data;
};

const updateSupplierFn = async ({ id, formData }: { id: string, formData: Partial<SupplierFormData> }): Promise<Supplier> => {
  const { data, error } = await supabase.from('suppliers').update({ ...formData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deleteSupplierFn = async (id: string): Promise<string> => {
  const { error } = await supabase.from('suppliers').delete().eq('id', id);
  if (error) throw error;
  return id;
};

export const useSuppliers = () => {
  const queryClient = useQueryClient();

  const { data: suppliers = [], isLoading: loading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
  });

  const { mutateAsync: createSupplier, isPending: isCreating } = useMutation({
    mutationFn: createSupplierFn,
    onSuccess: (newSupplier) => {
      queryClient.setQueryData(['suppliers'], (oldData: Supplier[] = []) => 
        [...oldData, newSupplier].sort((a, b) => a.name.localeCompare(b.name))
      );
      toast({ title: "Sucesso", description: "Fornecedor criado com sucesso." });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error) => {
      toast({ title: "Erro", description: "Erro ao criar fornecedor.", variant: "destructive" });
      console.error('Error creating supplier:', error);
    },
  });

  const { mutateAsync: updateSupplier, isPending: isUpdating } = useMutation({
    mutationFn: updateSupplierFn,
    onSuccess: (updatedSupplier) => {
      queryClient.setQueryData(['suppliers'], (oldData: Supplier[] = []) =>
        oldData.map(s => s.id === updatedSupplier.id ? updatedSupplier : s)
      );
      toast({ title: "Sucesso", description: "Fornecedor atualizado com sucesso." });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error) => {
      toast({ title: "Erro", description: "Erro ao atualizar fornecedor.", variant: "destructive" });
      console.error('Error updating supplier:', error);
    },
  });

  const { mutateAsync: deleteSupplier, isPending: isDeleting } = useMutation({
    mutationFn: deleteSupplierFn,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['suppliers'], (oldData: Supplier[] = []) =>
        oldData.filter(s => s.id !== deletedId)
      );
      toast({ title: "Sucesso", description: "Fornecedor excluído com sucesso." });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error) => {
      toast({ title: "Erro", description: "Erro ao excluir fornecedor.", variant: "destructive" });
      console.error('Error deleting supplier:', error);
    },
  });

  return {
    suppliers,
    loading,
    createSupplier,
    isCreating,
    updateSupplier,
    isUpdating,
    deleteSupplier,
    isDeleting,
  };
};
