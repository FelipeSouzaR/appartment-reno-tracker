
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RenovationFormData, RenovationItem } from '@/types/renovation';

interface RenovationFormProps {
  item?: RenovationItem;
  onSubmit: (data: RenovationFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const RenovationForm: React.FC<RenovationFormProps> = ({ item, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = React.useState<RenovationFormData>({
    itemNumber: item?.itemNumber || '',
    category: item?.category || '',
    description: item?.description || '',
    supplier: item?.supplier || '',
    budget: item?.budget || 0,
    estimatedPrice: item?.estimatedPrice || 0,
    purchaseDate: item?.purchaseDate || '',
    paidValue: item?.paidValue || 0,
    status: item?.status || 'Pending',
    paymentMethod: item?.paymentMethod || '',
    observations: item?.observations || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof RenovationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {isEditing ? 'Edit Renovation Item' : 'Add New Renovation Item'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemNumber">Item Number</Label>
              <Input
                id="itemNumber"
                value={formData.itemNumber}
                onChange={(e) => handleInputChange('itemNumber', e.target.value)}
                placeholder="e.g., 001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="e.g., Kitchen, Bathroom, Living Room"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Item Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of the renovation item"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                placeholder="Supplier name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Input
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                placeholder="e.g., Credit Card, Cash, Bank Transfer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget/Forecast (BRL)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedPrice">Estimated Price (BRL)</Label>
              <Input
                id="estimatedPrice"
                type="number"
                step="0.01"
                value={formData.estimatedPrice}
                onChange={(e) => handleInputChange('estimatedPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paidValue">Paid Value (BRL)</Label>
              <Input
                id="paidValue"
                type="number"
                step="0.01"
                value={formData.paidValue}
                onChange={(e) => handleInputChange('paidValue', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date/Payment</Label>
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
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observations</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              placeholder="Additional notes or observations"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {isEditing ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RenovationForm;
