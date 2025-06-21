
-- Criar tabela para os projetos de microflorestas
CREATE TABLE public.microforest_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_name TEXT,
  trees_planned INTEGER DEFAULT 0,
  trees_planted INTEGER DEFAULT 0,
  tree_types TEXT[],
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para imagens dos projetos
CREATE TABLE public.project_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.microforest_projects(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para artigos do Guia PUFF
CREATE TABLE public.guide_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES auth.users,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para desafios
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_value INTEGER NOT NULL,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('trees_planted', 'projects_created', 'co2_captured')),
  points_reward INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para progresso dos usuários nos desafios
CREATE TABLE public.user_challenge_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  current_progress INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Criar tabela para posts da comunidade
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para comentários nos posts
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para perfis de usuário
CREATE TABLE public.user_profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  profile_image_url TEXT,
  user_type TEXT DEFAULT 'community' CHECK (user_type IN ('student', 'teacher', 'school', 'community')),
  total_trees_planted INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS (Row Level Security) em todas as tabelas
ALTER TABLE public.microforest_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para projetos de microflorestas
CREATE POLICY "Todos podem ver projetos públicos" ON public.microforest_projects FOR SELECT USING (true);
CREATE POLICY "Usuários podem criar seus próprios projetos" ON public.microforest_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem editar seus próprios projetos" ON public.microforest_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar seus próprios projetos" ON public.microforest_projects FOR DELETE USING (auth.uid() = user_id);

-- Políticas para imagens dos projetos
CREATE POLICY "Todos podem ver imagens" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Donos de projeto podem adicionar imagens" ON public.project_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.microforest_projects WHERE id = project_id AND user_id = auth.uid())
);

-- Políticas para artigos do guia
CREATE POLICY "Todos podem ver artigos" ON public.guide_articles FOR SELECT USING (true);

-- Políticas para desafios
CREATE POLICY "Todos podem ver desafios" ON public.challenges FOR SELECT USING (true);

-- Políticas para progresso dos usuários
CREATE POLICY "Usuários podem ver seu próprio progresso" ON public.user_challenge_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar seu próprio progresso" ON public.user_challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar seu próprio progresso" ON public.user_challenge_progress FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para posts da comunidade
CREATE POLICY "Todos podem ver posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Usuários podem criar posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem editar seus posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para comentários
CREATE POLICY "Todos podem ver comentários" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Usuários podem comentar" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para perfis
CREATE POLICY "Todos podem ver perfis" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Usuários podem gerenciar seu próprio perfil" ON public.user_profiles FOR ALL USING (auth.uid() = id);

-- Função para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir alguns dados de exemplo para testar
INSERT INTO public.guide_articles (title, content, summary, category, author_id) VALUES
('Como Preparar o Solo para Microflorestas', 'Conteúdo completo sobre preparação de solo...', 'Guia básico para preparar o solo antes do plantio', 'Preparação', null),
('Espécies Nativas Recomendadas', 'Lista completa de espécies nativas...', 'Conheça as melhores espécies para sua região', 'Espécies', null),
('Manutenção de Microflorestas', 'Como cuidar da sua microfloresta...', 'Dicas essenciais de manutenção', 'Manutenção', null);

INSERT INTO public.challenges (title, description, target_value, challenge_type, points_reward) VALUES
('Primeira Microfloresta', 'Crie seu primeiro projeto de microfloresta', 1, 'projects_created', 50),
('Plantador Iniciante', 'Plante suas primeiras 10 árvores', 10, 'trees_planted', 100),
('Guardião Verde', 'Plante 50 árvores em seus projetos', 50, 'trees_planted', 250),
('Protetor da Natureza', 'Plante 100 árvores e ajude o meio ambiente', 100, 'trees_planted', 500);
