
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return 'Email é obrigatório';
  }
  
  if (!emailRegex.test(email)) {
    return 'Email inválido';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Senha é obrigatória';
  }
  
  if (password.length < 6) {
    return 'Senha deve ter pelo menos 6 caracteres';
  }
  
  return null;
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} é obrigatório`;
  }
  
  return null;
};

export const validatePositiveNumber = (value: number, fieldName: string): string | null => {
  if (isNaN(value) || value < 0) {
    return `${fieldName} deve ser um número positivo`;
  }
  
  return null;
};

export const validateDate = (date: string, fieldName: string): string | null => {
  if (!date) {
    return null; // Date might be optional
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return `${fieldName} deve ser uma data válida`;
  }
  
  return null;
};
