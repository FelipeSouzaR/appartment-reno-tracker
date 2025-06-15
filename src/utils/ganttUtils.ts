
import { RenovationItem } from '@/types/renovation';
import { parseISO, isValid, format, min, max, addDays, subDays } from 'date-fns';

export interface GanttItem {
  id: string;
  itemNumber: string;
  description: string;
  category: string;
  categoryColor: string;
  plannedStart: Date | null;
  plannedEnd: Date | null;
  executedDate: Date | null;
  purchaseDate: Date | null;
  status: string;
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

export const processGanttData = (items: RenovationItem[]): { ganttItems: GanttItem[], dateRange: GanttDateRange, categories: string[] } => {
  const validDates: Date[] = [];
  const categories = new Set<string>();
  
  // Extract all valid dates and categories
  items.forEach(item => {
    const categoryName = item.category_data?.name || item.category || 'Sem categoria';
    categories.add(categoryName);
    
    if (item.plannedDate) {
      const plannedDate = parseISO(item.plannedDate);
      if (isValid(plannedDate)) validDates.push(plannedDate);
    }
    
    if (item.executedDate) {
      const executedDate = parseISO(item.executedDate);
      if (isValid(executedDate)) validDates.push(executedDate);
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
    endDate = addDays(endDate, 7);
  } else {
    // Default range if no dates
    startDate = subDays(today, 30);
    endDate = addDays(today, 30);
  }

  const categoriesArray = Array.from(categories).sort();
  
  // Process items for Gantt display
  const ganttItems: GanttItem[] = items.map(item => {
    const categoryName = item.category_data?.name || item.category || 'Sem categoria';
    const categoryIndex = categoriesArray.indexOf(categoryName);
    
    return {
      id: item.id,
      itemNumber: item.itemNumber,
      description: item.description,
      category: categoryName,
      categoryColor: getCategoryColor(categoryName, categoryIndex),
      plannedStart: item.plannedDate ? parseISO(item.plannedDate) : null,
      plannedEnd: item.executedDate ? parseISO(item.executedDate) : (item.plannedDate ? addDays(parseISO(item.plannedDate), 1) : null),
      executedDate: item.executedDate ? parseISO(item.executedDate) : null,
      purchaseDate: item.purchaseDate ? parseISO(item.purchaseDate) : null,
      status: item.status,
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
