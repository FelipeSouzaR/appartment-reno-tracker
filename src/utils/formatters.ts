
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Pendente': 'Pendente',
    'Em Andamento': 'Em Andamento',
    'Concluído': 'Concluído',
    'Cancelado': 'Cancelado',
    'Planejamento': 'Planejamento',
    'Pausado': 'Pausado',
  };
  
  return statusMap[status] || status;
};

export const formatItemNumber = (itemNumber: string | number): string => {
  return String(itemNumber).padStart(3, '0');
};
