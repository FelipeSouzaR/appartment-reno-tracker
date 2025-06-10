
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { RenovationItem } from '@/types/renovation';

interface RenovationTableProps {
  items: RenovationItem[];
  onEdit: (item: RenovationItem) => void;
  onDelete: (id: string) => void;
}

const RenovationTable: React.FC<RenovationTableProps> = ({ items, onEdit, onDelete }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
      'Completed': 'bg-green-100 text-green-800 border-green-300',
      'Cancelled': 'bg-red-100 text-red-800 border-red-300',
    };
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const getTotalBudget = () => {
    return items.reduce((total, item) => total + item.budget, 0);
  };

  const getTotalPaid = () => {
    return items.reduce((total, item) => total + item.paidValue, 0);
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No renovation items added yet. Create your first item to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Budget</div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(getTotalBudget())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Paid</div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(getTotalPaid())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Remaining</div>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(getTotalBudget() - getTotalPaid())}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Renovation Items ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Item #</th>
                  <th className="text-left p-2 font-semibold">Category</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                  <th className="text-left p-2 font-semibold">Supplier</th>
                  <th className="text-left p-2 font-semibold">Budget</th>
                  <th className="text-left p-2 font-semibold">Estimated</th>
                  <th className="text-left p-2 font-semibold">Paid</th>
                  <th className="text-left p-2 font-semibold">Date</th>
                  <th className="text-left p-2 font-semibold">Status</th>
                  <th className="text-left p-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-mono text-sm">{item.itemNumber}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2 max-w-xs truncate" title={item.description}>
                      {item.description}
                    </td>
                    <td className="p-2">{item.supplier}</td>
                    <td className="p-2 text-right">{formatCurrency(item.budget)}</td>
                    <td className="p-2 text-right">{formatCurrency(item.estimatedPrice)}</td>
                    <td className="p-2 text-right">{formatCurrency(item.paidValue)}</td>
                    <td className="p-2">{formatDate(item.purchaseDate)}</td>
                    <td className="p-2">{getStatusBadge(item.status)}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(item.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RenovationTable;
