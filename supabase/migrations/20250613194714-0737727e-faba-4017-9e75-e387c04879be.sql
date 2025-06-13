
-- Create a table for renovation items
CREATE TABLE public.renovation_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_number TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  supplier TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL DEFAULT 0,
  estimated_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  purchase_date DATE,
  paid_value DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Pendente', 'Em Andamento', 'Concluído', 'Cancelado')) DEFAULT 'Pendente',
  payment_method TEXT,
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on item_number for faster queries
CREATE INDEX idx_renovation_items_item_number ON public.renovation_items(item_number);

-- Create an index on category for reporting
CREATE INDEX idx_renovation_items_category ON public.renovation_items(category);

-- Create an index on status for filtering
CREATE INDEX idx_renovation_items_status ON public.renovation_items(status);

-- Enable Row Level Security (making it public for now since there's no authentication yet)
ALTER TABLE public.renovation_items ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (we can add authentication later)
CREATE POLICY "Allow all operations on renovation_items" 
  ON public.renovation_items 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
