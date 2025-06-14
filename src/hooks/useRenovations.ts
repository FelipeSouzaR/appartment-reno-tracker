
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Renovation, RenovationCreateData } from '@/types/renovation';
import { toast } from '@/hooks/use-toast';

export const useRenovations = () => {
  const [renovations, setRenovations] = useState<Renovation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRenovations = async () => {
    try {
      const { data, error } = await supabase
        .from('renovations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRenovations(data || []);
    } catch (error) {
      console.error('Error fetching renovations:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar reformas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createRenovation = async (formData: RenovationCreateData) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('renovations')
        .insert([{
          ...formData,
          user_id: userData.user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setRenovations(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Reforma criada com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error creating renovation:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar reforma.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateRenovation = async (id: string, formData: Partial<RenovationCreateData>) => {
    try {
      const { data, error } = await supabase
        .from('renovations')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setRenovations(prev => prev.map(ren => ren.id === id ? data : ren));
      toast({
        title: "Sucesso",
        description: "Reforma atualizada com sucesso.",
      });
      return data;
    } catch (error) {
      console.error('Error updating renovation:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar reforma.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteRenovation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('renovations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRenovations(prev => prev.filter(ren => ren.id !== id));
      toast({
        title: "Sucesso",
        description: "Reforma excluída com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting renovation:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir reforma.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchRenovations();
  }, []);

  return {
    renovations,
    loading,
    createRenovation,
    updateRenovation,
    deleteRenovation,
    refreshRenovations: fetchRenovations,
  };
};
