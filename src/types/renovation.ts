
export interface RenovationItem {
  id: string;
  itemNumber: string;
  category: string;
  description: string;
  supplier: string;
  budget: number;
  estimatedPrice: number;
  purchaseDate: string;
  paidValue: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';
  paymentMethod: string;
  observations: string;
}

export interface RenovationFormData {
  itemNumber: string;
  category: string;
  description: string;
  supplier: string;
  budget: number;
  estimatedPrice: number;
  purchaseDate: string;
  paidValue: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';
  paymentMethod: string;
  observations: string;
}
