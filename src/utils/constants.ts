
export const RENOVATION_STATUSES = [
  'Planejamento',
  'Em Andamento',
  'Concluído',
  'Pausado',
  'Cancelado',
] as const;

export const ITEM_STATUSES = [
  'Pendente',
  'Em Andamento',
  'Concluído',
  'Cancelado',
] as const;

export const PAYMENT_METHODS = [
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Transferência',
  'PIX',
  'Cheque',
  'Financiamento',
] as const;

export const DEFAULT_CURRENCY = 'BRL';

export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'dd/MM/yyyy HH:mm',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;
