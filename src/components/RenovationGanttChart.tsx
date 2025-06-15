
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RenovationItem } from '@/types/renovation';
import { processGanttData, formatDateForGantt, getDaysBetweenDates, getCategoryColor } from '@/utils/ganttUtils';
import { format, addDays, eachDayOfInterval } from 'date-fns';

interface RenovationGanttChartProps {
  items: RenovationItem[];
}

const RenovationGanttChart: React.FC<RenovationGanttChartProps> = ({ items }) => {
  const { ganttItems, dateRange, categories } = processGanttData(items);
  
  if (ganttItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cronograma da Reforma</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nenhum item encontrado para exibir no cronograma.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalDays = getDaysBetweenDates(dateRange.startDate, dateRange.endDate);
  const dateHeaders = eachDayOfInterval({ start: dateRange.startDate, end: dateRange.endDate });

  const getPositionFromDate = (date: Date | null): number => {
    if (!date) return 0;
    const daysDiff = getDaysBetweenDates(dateRange.startDate, date);
    return Math.max(0, (daysDiff / totalDays) * 100);
  };

  const getWidthFromDates = (startDate: Date | null, endDate: Date | null): number => {
    if (!startDate || !endDate) return 0;
    const daysDiff = getDaysBetweenDates(startDate, endDate);
    return Math.max(1, (daysDiff / totalDays) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cronograma da Reforma</CardTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category, index) => (
            <Badge
              key={category}
              variant="outline"
              style={{
                borderColor: getCategoryColor(category, index),
                color: getCategoryColor(category, index),
              }}
            >
              {category}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Date Headers */}
            <div className="flex border-b border-gray-200 pb-2 mb-4">
              <div className="w-64 flex-shrink-0"></div>
              <div className="flex-1 relative">
                <div className="flex justify-between text-xs text-muted-foreground">
                  {dateHeaders.filter((_, index) => index % Math.ceil(dateHeaders.length / 10) === 0).map((date) => (
                    <span key={date.toISOString()}>
                      {formatDateForGantt(date)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Gantt Rows */}
            <div className="space-y-2">
              {ganttItems.map((item) => (
                <div key={item.id} className="flex items-center min-h-[60px] border-b border-gray-100 last:border-b-0">
                  {/* Item Info */}
                  <div className="w-64 flex-shrink-0 pr-4">
                    <div className="text-sm font-medium">
                      #{item.itemNumber}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </div>
                    <Badge
                      variant="outline"
                      className="mt-1 text-xs"
                      style={{
                        borderColor: item.categoryColor,
                        color: item.categoryColor,
                      }}
                    >
                      {item.category}
                    </Badge>
                  </div>

                  {/* Timeline */}
                  <div className="flex-1 relative h-8 bg-gray-50 rounded">
                    {/* Planned Timeline Bar */}
                    {item.plannedStart && item.plannedEnd && (
                      <div
                        className="absolute top-1 h-6 rounded opacity-60"
                        style={{
                          left: `${getPositionFromDate(item.plannedStart)}%`,
                          width: `${getWidthFromDates(item.plannedStart, item.plannedEnd)}%`,
                          backgroundColor: item.categoryColor,
                        }}
                        title={`Planejado: ${format(item.plannedStart, 'dd/MM/yyyy')} - ${format(item.plannedEnd, 'dd/MM/yyyy')}`}
                      />
                    )}

                    {/* Purchase Date Marker */}
                    {item.purchaseDate && (
                      <div
                        className="absolute top-0 w-1 h-8 bg-blue-600"
                        style={{
                          left: `${getPositionFromDate(item.purchaseDate)}%`,
                        }}
                        title={`Compra: ${format(item.purchaseDate, 'dd/MM/yyyy')}`}
                      >
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                    )}

                    {/* Executed Date Marker */}
                    {item.executedDate && (
                      <div
                        className="absolute top-0 w-1 h-8 bg-green-600"
                        style={{
                          left: `${getPositionFromDate(item.executedDate)}%`,
                        }}
                        title={`Executado: ${format(item.executedDate, 'dd/MM/yyyy')}`}
                      >
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm font-medium mb-2">Legenda:</div>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gray-400 opacity-60 rounded"></div>
                  <span>Período Planejado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Data da Compra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Data de Execução</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenovationGanttChart;
