
-- Add two new date columns to renovation_items table
ALTER TABLE public.renovation_items 
ADD COLUMN planned_date DATE,
ADD COLUMN executed_date DATE;

-- Add indexes for better query performance on the new date columns
CREATE INDEX idx_renovation_items_planned_date ON public.renovation_items(planned_date);
CREATE INDEX idx_renovation_items_executed_date ON public.renovation_items(executed_date);
