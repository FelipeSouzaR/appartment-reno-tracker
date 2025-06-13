
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  contact_info TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Allow all operations on categories" 
  ON public.categories 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for suppliers
CREATE POLICY "Allow all operations on suppliers" 
  ON public.suppliers 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Add some sample data
INSERT INTO public.categories (name, description) VALUES 
  ('Cozinha', 'Itens relacionados à cozinha'),
  ('Banheiro', 'Itens relacionados ao banheiro'),
  ('Sala', 'Itens relacionados à sala'),
  ('Quarto', 'Itens relacionados aos quartos'),
  ('Área Externa', 'Itens relacionados à área externa');

INSERT INTO public.suppliers (name, contact_info, phone, email) VALUES 
  ('Leroy Merlin', 'Loja de materiais de construção', '(11) 3000-1000', 'contato@leroymerlin.com.br'),
  ('C&C', 'Casa e Construção', '(11) 3000-2000', 'atendimento@cc.com.br'),
  ('Telhanorte', 'Materiais de construção', '(11) 3000-3000', 'vendas@telhanorte.com.br'),
  ('Home Center', 'Produtos para casa', '(11) 3000-4000', 'info@homecenter.com.br');

-- Now update the renovation_items table to use foreign keys
ALTER TABLE public.renovation_items 
  ADD COLUMN category_id UUID REFERENCES public.categories(id),
  ADD COLUMN supplier_id UUID REFERENCES public.suppliers(id);

-- Create indexes for the foreign keys
CREATE INDEX idx_renovation_items_category_id ON public.renovation_items(category_id);
CREATE INDEX idx_renovation_items_supplier_id ON public.renovation_items(supplier_id);

-- We'll keep the old text columns for now during migration, but they can be removed later
-- ALTER TABLE public.renovation_items DROP COLUMN category;
-- ALTER TABLE public.renovation_items DROP COLUMN supplier;
