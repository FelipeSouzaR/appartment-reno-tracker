
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UseEntityCRUDOptions<T> {
  tableName: string;
  entityName: string;
  orderBy?: { column: string; ascending?: boolean };
  select?: string;
  transform?: (data: any) => T;
}

export const useEntityCRUD = <T extends { id: string }, TFormData>(
  options: UseEntityCRUDOptions<T>
) => {
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const { tableName, entityName, orderBy, select = '*', transform } = options;

  const fetchEntities = async () => {
    try {
      let query = supabase.from(tableName).select(select);
      
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
      }

      const { data, error } = await query;
      if (error) throw error;
      
      const transformedData = transform 
        ? (data || []).map(transform)
        : (data || []) as T[];
      
      setEntities(transformedData);
    } catch (error) {
      console.error(`Error fetching ${entityName}s:`, error);
      toast({
        title: "Erro",
        description: `Erro ao carregar ${entityName}s.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEntity = async (formData: TFormData) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(formData)
        .select(select)
        .single();

      if (error) throw error;
      
      const transformedData = transform ? transform(data) : data as T;
      setEntities(prev => [transformedData, ...prev]);
      
      toast({
        title: "Sucesso",
        description: `${entityName} criado com sucesso.`,
      });
      return transformedData;
    } catch (error) {
      console.error(`Error creating ${entityName}:`, error);
      toast({
        title: "Erro",
        description: `Erro ao criar ${entityName}.`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateEntity = async (id: string, formData: Partial<TFormData>) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(select)
        .single();

      if (error) throw error;

      const transformedData = transform ? transform(data) : data as T;
      setEntities(prev => prev.map(entity => 
        entity.id === id ? transformedData : entity
      ));
      
      toast({
        title: "Sucesso",
        description: `${entityName} atualizado com sucesso.`,
      });
      return transformedData;
    } catch (error) {
      console.error(`Error updating ${entityName}:`, error);
      toast({
        title: "Erro",
        description: `Erro ao atualizar ${entityName}.`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteEntity = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntities(prev => prev.filter(entity => entity.id !== id));
      toast({
        title: "Sucesso",
        description: `${entityName} excluído com sucesso.`,
      });
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
      toast({
        title: "Erro",
        description: `Erro ao excluir ${entityName}.`,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    entities,
    loading,
    createEntity,
    updateEntity,
    deleteEntity,
    refreshEntities: fetchEntities,
    setEntities,
  };
};
