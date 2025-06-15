
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RenovationFormData, RenovationItem } from '@/types/renovation';
import { useCategories } from '@/hooks/useCategories';
import { useSuppliers } from '@/hooks/useSuppliers';

interface RenovationFormProps {
  item?: RenovationItem;
  onSubmit: (data: RenovationFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const RenovationForm: React.FC<RenovationFormProps> = ({ item, onSubmit, onCancel, isEditing }) => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { suppliers, loading: suppliersLoading } = useSuppliers();
  
  const [formData, setFormData] = React.useState<RenovationFormData>({
    renovation_id: item?.renovation_id || '',
    itemNumber: item?.itemNumber || '',
    categoryId: item?.categoryId || '',
    supplierId: item?.supplierId || '',
    description: item?.description || '',
    budget: item?.budget || 0,
    estimatedPrice: item?.estimatedPrice || 0,
    purchaseDate: item?.purchaseDate || '',
    paidValue: item?.paidValue || 0,
    status: item?.status || 'Pendente',
    paymentMethod: item?.paymentMethod || '',
    observations: item?.observations || '',
  });

  // Valores de display para os campos numéricos (strings vazias quando não há valor)
  const [displayValues, setDisplayValues] = React.useState({
    budget: item?.budget ? item.budget.toString() : '',
    estimatedPrice: item?.estimatedPrice ? item.estimatedPrice.toString() : '',
    paidValue: item?.paidValue ? item.paidValue.toString() : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.itemNumber.trim()) {
      alert('Número do item é obrigatório');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Descrição é obrigatória');
      return;
    }
    
    console.log('Form data being submitted:', formData);
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof RenovationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericInputChange = (field: 'budget' | 'estimatedPrice' | 'paidValue', value: string) => {
    // Atualiza o valor de display
    setDisplayValues(prev => ({ ...prev, [field]: value }));
    
    // Converte para número ou mantém 0 se vazio
    const numericValue = value === '' ? 0 : parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {isEditing ? 'Editar Item de Reforma' : 'Adicionar Novo Item de Reforma'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemNumber">Número do Item *</Label>
              <Input
                id="itemNumber"
                value={formData.itemNumber}
                onChange={(e) => handleInputChange('itemNumber', e.target.value)}
                placeholder="ex: 001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryId">Categoria</Label>
              <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma categoria</SelectItem>
                  {categoriesLoading ? (
                    <SelectItem value="loading" disabled>Carregando...</SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Item *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição detalhada do item de reforma"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplierId">Fornecedor</Label>
              <Select value={formData.supplierId} onValueChange={(value) => handleInputChange('supplierId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum fornecedor</SelectItem>
                  {suppliersLoading ? (
                    <SelectItem value="loading" disabled>Carregando...</SelectItem>
                  ) : (
                    suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
              <Input
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                placeholder="ex: Cartão de Crédito, Dinheiro, PIX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento/Previsão (R$)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                min="0"
                value={displayValues.budget}
                onChange={(e) => handleNumericInputChange('budget', e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedPrice">Preço Estimado (R$)</Label>
              <Input
                id="estimatedPrice"
                type="number"
                step="0.01"
                min="0"
                value={displayValues.estimatedPrice}
                onChange={(e) => handleNumericInputChange('estimatedPrice', e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paidValue">Valor Pago (R$)</Label>
              <Input
                id="paidValue"
                type="number"
                step="0.01"
                min="0"
                value={displayValues.paidValue}
                onChange={(e) => handleNumericInputChange('paidValue', e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Data da Compra/Pagamento</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              placeholder="Notas adicionais ou observações"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {isEditing ? 'Atualizar Item' : 'Adicionar Item'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RenovationForm;
