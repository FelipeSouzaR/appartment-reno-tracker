
export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_info?: string;
  phone?: string;
  email?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Renovation {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  start_date?: string;
  target_completion_date?: string;
  status: 'Planejamento' | 'Em Andamento' | 'Concluído' | 'Pausado' | 'Cancelado';
  created_at: string;
  updated_at: string;
}

export interface RenovationItem {
  id: string;
  renovation_id: string;
  itemNumber: string;
  category?: string; // Keep for backward compatibility
  categoryId?: string;
  supplier?: string; // Keep for backward compatibility
  supplierId?: string;
  description: string;
  budget: number;
  estimatedPrice: number;
  purchaseDate?: string;
  paidValue: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';
  paymentMethod?: string;
  observations?: string;
  created_at: string;
  updated_at: string;
  // Joined data from foreign keys
  category_data?: Category;
  supplier_data?: Supplier;
}

export interface RenovationFormData {
  renovation_id: string;
  itemNumber: string;
  categoryId: string;
  supplierId: string;
  description: string;
  budget: number;
  estimatedPrice: number;
  purchaseDate?: string;
  paidValue: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';
  paymentMethod?: string;
  observations?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
}

export interface SupplierFormData {
  name: string;
  contact_info?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface RenovationCreateData {
  name: string;
  description?: string;
  start_date?: string;
  target_completion_date?: string;
  status?: 'Planejamento' | 'Em Andamento' | 'Concluído' | 'Pausado' | 'Cancelado';
}
