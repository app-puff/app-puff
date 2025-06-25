
-- Habilitar RLS na tabela microforest_projects
ALTER TABLE public.microforest_projects ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos os usuários autenticados vejam todos os projetos (para o Mapa Verde)
CREATE POLICY "Everyone can view all projects" 
  ON public.microforest_projects 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Política para permitir que usuários autenticados criem seus próprios projetos
CREATE POLICY "Users can create their own projects" 
  ON public.microforest_projects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Política para permitir que usuários editem apenas seus próprios projetos
CREATE POLICY "Users can update their own projects" 
  ON public.microforest_projects 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Política para permitir que usuários deletem apenas seus próprios projetos
CREATE POLICY "Users can delete their own projects" 
  ON public.microforest_projects 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Habilitar RLS na tabela user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos vejam perfis (para mostrar nomes nos projetos)
CREATE POLICY "Everyone can view profiles" 
  ON public.user_profiles 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Política para permitir que usuários atualizem apenas seu próprio perfil
CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);
