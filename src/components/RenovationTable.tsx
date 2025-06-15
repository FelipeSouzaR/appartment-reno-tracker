
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Pendente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Em Andamento': 'bg-blue-100 text-blue-800 border-blue-300',
      'Concluído': 'bg-green-100 text-green-800 border-green-300',
      'Cancelado': 'bg-red-100 text-red-800 border-red-300',
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
          <p className="text-muted-foreground">Nenhum item de reforma adicionado ainda. Crie seu primeiro item para começar!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Orçamento Total</div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(getTotalBudget())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Pago</div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(getTotalPaid())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Restante</div>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(getTotalBudget() - getTotalPaid())}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens de Reforma ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Ações</TableHead>
                  <TableHead className="whitespace-nowrap">Item#</TableHead>
                  <TableHead className="whitespace-nowrap">Categoria</TableHead>
                  <TableHead className="whitespace-nowrap">Descrição</TableHead>
                  <TableHead className="whitespace-nowrap">Fornecedor</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Orçamento</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Estimado</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Pago</TableHead>
                  <TableHead className="whitespace-nowrap">Planejada</TableHead>
                  <TableHead className="whitespace-nowrap">Executada</TableHead>
                  <TableHead className="whitespace-nowrap">Compra</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap">
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
                    </TableCell>
                    <TableCell className="font-mono text-sm whitespace-nowrap">{item.itemNumber}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.category_data?.name || item.category || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.description}>
                      {item.description}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{item.supplier_data?.name || item.supplier || '-'}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{formatCurrency(item.budget)}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{formatCurrency(item.estimatedPrice)}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{formatCurrency(item.paidValue)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(item.plannedDate)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(item.executedDate)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(item.purchaseDate)}</TableCell>
                    <TableCell className="whitespace-nowrap">{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RenovationTable;
