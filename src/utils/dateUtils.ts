
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateForDisplay = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return '';
    }
    
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatDateForInput = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return '';
    }
    
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

export const formatDateTimeForDisplay = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return '';
    }
    
    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return '';
  }
};

export const isDateValid = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj);
  } catch (error) {
    return false;
  }
};

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const addDays = (date: string | Date, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
};
