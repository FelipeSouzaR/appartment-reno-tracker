
import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useOptimizedCallbacks } from '@/hooks/useOptimizedRender';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { getErrorMessage } from '@/utils/errorUtils';

interface UseEntityCRUDOptions<T> {
  tableName: string;
  entityName: string;
  orderBy?: { column: string; ascending?: boolean };
  select?: string;
  transform?: (data: any) => T;
}

export const useEntityCRUD = <T extends { id: string }, TFormData = any>(
  options: UseEntityCRUDOptions<T>
) => {
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandling();
  const { tableName, entityName, orderBy, select = '*', transform } = options;

  const fetchEntities = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from(tableName as any).select(select);
      
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
      }

      const { data, error } = await query;
      if (error) throw error;
      
      const transformedData = transform 
        ? (data || []).map(transform)
        : (data || []) as unknown as T[];
      
      setEntities(transformedData);
    } catch (error) {
      handleError(error, `fetch-${entityName}s`);
      console.error(`Error fetching ${entityName}s:`, error);
    } finally {
      setLoading(false);
    }
  }, [tableName, entityName, orderBy, select, transform, handleError]);

  const createEntity = useCallback(async (formData: TFormData) => {
    try {
      const { data, error } = await supabase
        .from(tableName as any)
        .insert(formData as any)
        .select(select)
        .single();

      if (error) throw error;
      
      const transformedData = transform ? transform(data) : data as unknown as T;
      setEntities(prev => [transformedData, ...prev]);
      
      toast({
        title: "Sucesso",
        description: `${entityName} criado com sucesso.`,
      });
      return transformedData;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      handleError(error, `create-${entityName}`, false);
      toast({
        title: "Erro",
        description: `Erro ao criar ${entityName}: ${errorMessage}`,
        variant: "destructive",
      });
      throw error;
    }
  }, [tableName, entityName, select, transform, handleError]);

  const updateEntity = useCallback(async (id: string, formData: Partial<TFormData>) => {
    try {
      const { data, error } = await supabase
        .from(tableName as any)
        .update({ ...formData, updated_at: new Date().toISOString() } as any)
        .eq('id', id)
        .select(select)
        .single();

      if (error) throw error;

      const transformedData = transform ? transform(data) : data as unknown as T;
      setEntities(prev => prev.map(entity => 
        entity.id === id ? transformedData : entity
      ));
      
      toast({
        title: "Sucesso",
        description: `${entityName} atualizado com sucesso.`,
      });
      return transformedData;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      handleError(error, `update-${entityName}`, false);
      toast({
        title: "Erro",
        description: `Erro ao atualizar ${entityName}: ${errorMessage}`,
        variant: "destructive",
      });
      throw error;
    }
  }, [tableName, entityName, select, transform, handleError]);

  const deleteEntity = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntities(prev => prev.filter(entity => entity.id !== id));
      toast({
        title: "Sucesso",
        description: `${entityName} excluído com sucesso.`,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      handleError(error, `delete-${entityName}`, false);
      toast({
        title: "Erro",
        description: `Erro ao excluir ${entityName}: ${errorMessage}`,
        variant: "destructive",
      });
      throw error;
    }
  }, [tableName, entityName, handleError]);

  // Optimize callbacks for better performance
  const optimizedCallbacks = useOptimizedCallbacks({
    createEntity,
    updateEntity,
    deleteEntity,
    refreshEntities: fetchEntities,
  }, [createEntity, updateEntity, deleteEntity, fetchEntities]);

  // Memoize the return object to prevent unnecessary re-renders
  const returnValue = useMemo(() => ({
    entities,
    loading,
    ...optimizedCallbacks,
    setEntities,
  }), [entities, loading, optimizedCallbacks]);

  return returnValue;
};
