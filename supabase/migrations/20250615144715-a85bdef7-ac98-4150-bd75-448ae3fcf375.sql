
-- Add estimated and real duration columns to renovation_items table
ALTER TABLE public.renovation_items 
ADD COLUMN estimated_duration_days INTEGER,
ADD COLUMN real_duration_days INTEGER;

-- Add comments to clarify these are working/running days
COMMENT ON COLUMN public.renovation_items.estimated_duration_days IS 'Estimated duration in working/running days';
COMMENT ON COLUMN public.renovation_items.real_duration_days IS 'Actual duration in working/running days';
