
-- Add foreign key relationship between microforest_projects and user_profiles
ALTER TABLE public.microforest_projects 
ADD CONSTRAINT fk_microforest_projects_user_profiles 
FOREIGN KEY (user_id) REFERENCES public.user_profiles(id) ON DELETE CASCADE;
