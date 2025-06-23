
-- Disable email confirmation requirement
-- This needs to be done in Supabase Dashboard under Authentication > Settings
-- But we can prepare the user profiles for the admin users

-- Insert the admin users into user_profiles (they will need to sign up normally first)
-- We'll create a role system for administrators

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'moderator', 'user');

-- Add role column to user_profiles
ALTER TABLE public.user_profiles 
ADD COLUMN role public.user_role DEFAULT 'user';

-- Update existing users to have admin role if needed
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE id IN (
  SELECT id FROM auth.users 
  WHERE email IN ('yvson@hotmail.com', 'xthaislima@gmail.com', 'visitante@gmail.com')
);
