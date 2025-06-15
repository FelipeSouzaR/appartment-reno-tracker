
import { RenovationItem } from '@/types/renovation';
import { parseISO, isValid, format, min, max, addDays, subDays, addBusinessDays } from 'date-fns';

export interface GanttItem {
  id: string;
  itemNumber: string;
  description: string;
  category: string;
  categoryColor: string;
  plannedStart: Date | null;
  plannedEnd: Date | null;
  executedStart: Date | null;
  executedEnd: Date | null;
  purchaseDate: Date | null;
  status: string;
  estimatedDurationDays?: number;
  realDurationDays?: number;
}

export interface GanttDateRange {
  startDate: Date;
  endDate: Date;
}

const CATEGORY_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316', // orange
  '#ec4899', // pink
  '#6b7280', // gray
];

export const getCategoryColor = (categoryName: string, index: number): string => {
  if (!categoryName || categoryName === 'Sem categoria') {
    return '#6b7280'; // gray for no category
  }
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
};

export const calculateEndDate = (startDate: Date, durationDays: number): Date => {
  // Use addBusinessDays for working days calculation
  return addBusinessDays(startDate, durationDays);
};

export const processGanttData = (items: RenovationItem[]): { ganttItems: GanttItem[], dateRange: GanttDateRange, categories: string[] } => {
  const validDates: Date[] = [];
  const categories = new Set<string>();
  
  // Extract all valid dates and categories
  items.forEach(item => {
    const categoryName = item.category_data?.name || item.category || 'Sem categoria';
    categories.add(categoryName);
    
    if (item.plannedDate) {
      const plannedDate = parseISO(item.plannedDate);
      if (isValid(plannedDate)) {
        validDates.push(plannedDate);
        // Add planned end date if duration is available
        if (item.estimatedDurationDays) {
          const plannedEnd = calculateEndDate(plannedDate, item.estimatedDurationDays);
          validDates.push(plannedEnd);
        }
      }
    }
    
    if (item.executedDate) {
      const executedDate = parseISO(item.executedDate);
      if (isValid(executedDate)) {
        validDates.push(executedDate);
        // Add executed end date if duration is available
        if (item.realDurationDays) {
          const executedEnd = calculateEndDate(executedDate, item.realDurationDays);
          validDates.push(executedEnd);
        }
      }
    }
    
    if (item.purchaseDate) {
      const purchaseDate = parseISO(item.purchaseDate);
      if (isValid(purchaseDate)) validDates.push(purchaseDate);
    }
  });

  // Calculate date range with some padding
  const today = new Date();
  let startDate = today;
  let endDate = today;
  
  if (validDates.length > 0) {
    startDate = min(validDates);
    endDate = max(validDates);
    
    // Add padding
    startDate = subDays(startDate, 7);
    endDate = addDays(endDate, 14);
  } else {
    // Default range if no dates
    startDate = subDays(today, 30);
    endDate = addDays(today, 60);
  }

  const categoriesArray = Array.from(categories).sort();
  
  // Process items for Gantt display
  const ganttItems: GanttItem[] = items.map(item => {
    const categoryName = item.category_data?.name || item.category || 'Sem categoria';
    const categoryIndex = categoriesArray.indexOf(categoryName);
    
    const plannedStart = item.plannedDate ? parseISO(item.plannedDate) : null;
    const plannedEnd = plannedStart && item.estimatedDurationDays 
      ? calculateEndDate(plannedStart, item.estimatedDurationDays) 
      : null;
      
    const executedStart = item.executedDate ? parseISO(item.executedDate) : null;
    const executedEnd = executedStart && item.realDurationDays 
      ? calculateEndDate(executedStart, item.realDurationDays) 
      : null;
    
    return {
      id: item.id,
      itemNumber: item.itemNumber,
      description: item.description,
      category: categoryName,
      categoryColor: getCategoryColor(categoryName, categoryIndex),
      plannedStart,
      plannedEnd,
      executedStart,
      executedEnd,
      purchaseDate: item.purchaseDate ? parseISO(item.purchaseDate) : null,
      status: item.status,
      estimatedDurationDays: item.estimatedDurationDays,
      realDurationDays: item.realDurationDays,
    };
  });

  return {
    ganttItems,
    dateRange: { startDate, endDate },
    categories: categoriesArray,
  };
};

export const formatDateForGantt = (date: Date): string => {
  return format(date, 'dd/MM');
};

export const getDaysBetweenDates = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const calculateRenovationEndDate = (items: RenovationItem[]): { estimatedEndDate: Date | null, actualEndDate: Date | null } => {
  let estimatedEndDate: Date | null = null;
  let actualEndDate: Date | null = null;
  
  items.forEach(item => {
    // Calculate estimated end date
    if (item.plannedDate && item.estimatedDurationDays) {
      const itemEstimatedEnd = calculateEndDate(parseISO(item.plannedDate), item.estimatedDurationDays);
      if (!estimatedEndDate || itemEstimatedEnd > estimatedEndDate) {
        estimatedEndDate = itemEstimatedEnd;
      }
    }
    
    // Calculate actual end date
    if (item.executedDate && item.realDurationDays) {
      const itemActualEnd = calculateEndDate(parseISO(item.executedDate), item.realDurationDays);
      if (!actualEndDate || itemActualEnd > actualEndDate) {
        actualEndDate = itemActualEnd;
      }
    }
  });
  
  return { estimatedEndDate, actualEndDate };
};
