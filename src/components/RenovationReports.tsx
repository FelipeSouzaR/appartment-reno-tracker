
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RenovationItem } from '@/types/renovation';

interface RenovationReportsProps {
  items: RenovationItem[];
}

const RenovationReports: React.FC<RenovationReportsProps> = ({ items }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusData = () => {
    const statusCount = items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
      items: items.filter(item => item.status === status)
    }));
  };

  const getTotalBudget = () => {
    return items.reduce((total, item) => total + item.budget, 0);
  };

  const getTotalEstimated = () => {
    return items.reduce((total, item) => total + item.estimatedPrice, 0);
  };

  const getTotalPaid = () => {
    return items.reduce((total, item) => total + item.paidValue, 0);
  };

  const getCategoryData = () => {
    const categoryBudget = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.budget;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryBudget).map(([category, budget]) => ({
      category,
      budget
    }));
  };

  const getToDoItems = () => {
    return items.filter(item => item.status === 'Pendente' || item.status === 'Em Andamento');
  };

  const statusColors = {
    'Pendente': '#fbbf24',
    'Em Andamento': '#3b82f6',
    'Concluído': '#10b981',
    'Cancelado': '#ef4444',
  };

  const COLORS = ['#3b82f6', '#10b981', '#fbbf24', '#ef4444', '#8b5cf6', '#f59e0b'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Relatórios da Reforma</CardTitle>
        </CardHeader>
      </Card>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total de Itens</div>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Orçamento Total</div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(getTotalBudget())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Estimado</div>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(getTotalEstimated())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Investido</div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(getTotalPaid())}</div>
          </CardContent>
        </Card>
      </div>

      {/* Itens por Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Itens por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getStatusData().map(({ status, count }) => (
                <div key={status} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      style={{ 
                        backgroundColor: statusColors[status as keyof typeof statusColors] + '20',
                        color: statusColors[status as keyof typeof statusColors],
                        borderColor: statusColors[status as keyof typeof statusColors]
                      }}
                    >
                      {status}
                    </Badge>
                    <span className="font-medium">{count} itens</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: statusColors[status as keyof typeof statusColors] }}>
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Status */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {getStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[entry.status as keyof typeof statusColors]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Orçamento por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Orçamento por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getCategoryData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="budget" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lista de Tarefas (To-Do) */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tarefas (To-Do) - {getToDoItems().length} itens</CardTitle>
        </CardHeader>
        <CardContent>
          {getToDoItems().length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Parabéns! Todos os itens foram concluídos ou cancelados.
            </p>
          ) : (
            <div className="space-y-3">
              {getToDoItems().map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        #{item.itemNumber}
                      </span>
                      <Badge 
                        style={{ 
                          backgroundColor: statusColors[item.status as keyof typeof statusColors] + '20',
                          color: statusColors[item.status as keyof typeof statusColors],
                          borderColor: statusColors[item.status as keyof typeof statusColors]
                        }}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold mt-1">{item.description}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.category} • {item.supplier} • {formatCurrency(item.budget)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RenovationReports;
