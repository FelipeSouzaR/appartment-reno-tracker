
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RenovationItem } from '@/types/renovation';
import { processGanttData, formatDateForGantt, getDaysBetweenDates, getCategoryColor, calculateRenovationEndDate } from '@/utils/ganttUtils';
import { format, eachDayOfInterval } from 'date-fns';

interface RenovationGanttChartProps {
  items: RenovationItem[];
}

const RenovationGanttChart: React.FC<RenovationGanttChartProps> = ({ items }) => {
  const { ganttItems, dateRange, categories } = processGanttData(items);
  const { estimatedEndDate, actualEndDate } = calculateRenovationEndDate(items);
  
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
        
        {/* Renovation End Dates Summary */}
        {(estimatedEndDate || actualEndDate) && (
          <div className="bg-muted/50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-2">Previsão de Conclusão da Reforma:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {estimatedEndDate && (
                <div>
                  <span className="text-muted-foreground">Data Estimada: </span>
                  <span className="font-medium text-blue-600">
                    {format(estimatedEndDate, 'dd/MM/yyyy')}
                  </span>
                </div>
              )}
              {actualEndDate && (
                <div>
                  <span className="text-muted-foreground">Data Real Projetada: </span>
                  <span className="font-medium text-green-600">
                    {format(actualEndDate, 'dd/MM/yyyy')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
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
                <div key={item.id} className="flex items-center min-h-[70px] border-b border-gray-100 last:border-b-0">
                  {/* Item Info */}
                  <div className="w-64 flex-shrink-0 pr-4">
                    <div className="text-sm font-medium">
                      #{item.itemNumber}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: item.categoryColor,
                          color: item.categoryColor,
                        }}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    {/* Duration info */}
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.estimatedDurationDays && (
                        <span>Est: {item.estimatedDurationDays}d úteis</span>
                      )}
                      {item.estimatedDurationDays && item.realDurationDays && ' | '}
                      {item.realDurationDays && (
                        <span>Real: {item.realDurationDays}d úteis</span>
                      )}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex-1 relative h-10 bg-gray-50 rounded">
                    {/* Planned Timeline Bar */}
                    {item.plannedStart && item.plannedEnd && (
                      <div
                        className="absolute top-1 h-3 rounded opacity-60 border border-gray-300"
                        style={{
                          left: `${getPositionFromDate(item.plannedStart)}%`,
                          width: `${getWidthFromDates(item.plannedStart, item.plannedEnd)}%`,
                          backgroundColor: item.categoryColor,
                        }}
                        title={`Planejado: ${format(item.plannedStart, 'dd/MM/yyyy')} - ${format(item.plannedEnd, 'dd/MM/yyyy')} (${item.estimatedDurationDays} dias úteis)`}
                      />
                    )}

                    {/* Actual/Executed Timeline Bar */}
                    {item.executedStart && item.executedEnd && (
                      <div
                        className="absolute top-5 h-3 rounded border-2"
                        style={{
                          left: `${getPositionFromDate(item.executedStart)}%`,
                          width: `${getWidthFromDates(item.executedStart, item.executedEnd)}%`,
                          backgroundColor: item.categoryColor,
                          borderColor: '#10b981',
                        }}
                        title={`Executado: ${format(item.executedStart, 'dd/MM/yyyy')} - ${format(item.executedEnd, 'dd/MM/yyyy')} (${item.realDurationDays} dias úteis)`}
                      />
                    )}

                    {/* Purchase Date Marker */}
                    {item.purchaseDate && (
                      <div
                        className="absolute top-0 w-1 h-10 bg-blue-600"
                        style={{
                          left: `${getPositionFromDate(item.purchaseDate)}%`,
                        }}
                        title={`Compra: ${format(item.purchaseDate, 'dd/MM/yyyy')}`}
                      >
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                    )}

                    {/* Executed Start Date Marker (if no end date) */}
                    {item.executedStart && !item.executedEnd && (
                      <div
                        className="absolute top-0 w-1 h-10 bg-green-600"
                        style={{
                          left: `${getPositionFromDate(item.executedStart)}%`,
                        }}
                        title={`Iniciado: ${format(item.executedStart, 'dd/MM/yyyy')}`}
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
                  <div className="w-4 h-2 bg-gray-400 opacity-60 rounded border border-gray-300"></div>
                  <span>Período Planejado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gray-400 rounded border-2 border-green-500"></div>
                  <span>Período Executado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Data da Compra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Início da Execução</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                * Durações em dias úteis (segunda a sexta-feira)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenovationGanttChart;
