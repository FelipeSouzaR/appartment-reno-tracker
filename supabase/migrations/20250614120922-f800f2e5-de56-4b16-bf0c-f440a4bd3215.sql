
-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create renovations table to group renovation items
CREATE TABLE public.renovations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  target_completion_date DATE,
  status TEXT NOT NULL DEFAULT 'Planejamento',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add renovation_id to existing renovation_items table
ALTER TABLE public.renovation_items 
ADD COLUMN renovation_id UUID REFERENCES public.renovations(id) ON DELETE CASCADE;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.renovations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.renovation_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for renovations table
CREATE POLICY "Users can view their own renovations" 
  ON public.renovations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own renovations" 
  ON public.renovations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own renovations" 
  ON public.renovations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own renovations" 
  ON public.renovations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Update RLS Policies for renovation_items table
DROP POLICY IF EXISTS "renovation_items_policy" ON public.renovation_items;

CREATE POLICY "Users can view items from their renovations" 
  ON public.renovation_items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.renovations 
      WHERE renovations.id = renovation_items.renovation_id 
      AND renovations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create items in their renovations" 
  ON public.renovation_items 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.renovations 
      WHERE renovations.id = renovation_items.renovation_id 
      AND renovations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in their renovations" 
  ON public.renovation_items 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.renovations 
      WHERE renovations.id = renovation_items.renovation_id 
      AND renovations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their renovations" 
  ON public.renovation_items 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.renovations 
      WHERE renovations.id = renovation_items.renovation_id 
      AND renovations.user_id = auth.uid()
    )
  );

-- Function to automatically create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
