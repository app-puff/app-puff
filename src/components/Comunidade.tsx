
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Users, MessageSquare, Heart, Share2, Plus, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
  user_id: string;
}

interface ComunidadeProps {
  onBack: () => void;
}

const Comunidade = ({ onBack }: ComunidadeProps) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'duvidas'
  });

  const categories = [
    { id: 'all', name: 'Todos', icon: '📋', color: 'bg-gray-500' },
    { id: 'duvidas', name: 'Dúvidas e Soluções', icon: '🧠', color: 'bg-blue-500' },
    { id: 'projetos', name: 'Projetos Inspiradores', icon: '🌟', color: 'bg-yellow-500' },
    { id: 'parcerias', name: 'Parcerias e Doações', icon: '🛠️', color: 'bg-green-500' },
    { id: 'eventos', name: 'Eventos e Mutirões', icon: '📅', color: 'bg-purple-500' },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os posts da comunidade",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para criar posts",
        variant: "destructive"
      });
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha título e conteúdo",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([
          {
            title: newPost.title,
            content: newPost.content,
            category: newPost.category,
            user_id: user.id
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Post criado!",
        description: "Seu post foi publicado na comunidade"
      });

      setNewPost({ title: '', content: '', category: 'duvidas' });
      setShowCreatePost(false);
      fetchPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o post",
        variant: "destructive"
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  // Sample posts if no posts exist
  const samplePosts = [
    {
      id: '1',
      title: 'Como identificar o melhor tipo de solo?',
      content: 'Estou iniciando minha primeira microfloresta e tenho dúvidas sobre como analisar o solo. Alguém pode me ajudar com dicas práticas?',
      category: 'duvidas',
      likes_count: 12,
      created_at: new Date().toISOString(),
      user_id: 'sample'
    },
    {
      id: '2',
      title: 'Microfloresta da Escola Verde - Resultados incríveis!',
      content: 'Após 6 meses, nossa microfloresta já tem 2 metros de altura! Compartilho aqui nossos aprendizados e progressos.',
      category: 'projetos',
      likes_count: 28,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      user_id: 'sample'
    },
    {
      id: '3',
      title: 'Procuramos parceiros para projeto comunitário',
      content: 'Queremos criar uma grande área verde no bairro. Quem pode nos ajudar com mudas, ferramentas ou conhecimento?',
      category: 'parcerias',
      likes_count: 8,
      created_at: new Date(Date.now() - 172800000).toISOString(),
      user_id: 'sample'
    }
  ];

  const displayPosts = posts.length > 0 ? filteredPosts : samplePosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">🤝 Comunidade PUFF</h1>
          <Button 
            onClick={() => setShowCreatePost(!showCreatePost)} 
            className="bg-puff-green hover:bg-puff-green/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Button>
        </div>

        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-puff-green" />
              <span>Fórum Colaborativo</span>
            </CardTitle>
            <CardDescription>
              Conecte-se com outros entusiastas de microflorestas, tire dúvidas e compartilhe experiências
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Create Post Form */}
        {showCreatePost && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Criar Novo Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Título do seu post"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Textarea
                  placeholder="Compartilhe seus pensamentos, dúvidas ou experiências..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={createPost} className="bg-puff-green hover:bg-puff-green/90">
                  Publicar
                </Button>
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? `${category.color} text-white` : ''}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayPosts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Nenhum post encontrado
                </h3>
                <p className="text-gray-500">
                  Seja o primeiro a compartilhar algo com a comunidade!
                </p>
              </CardContent>
            </Card>
          ) : (
            displayPosts.map((post) => {
              const categoryInfo = getCategoryInfo(post.category);
              return (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${categoryInfo.color} text-white`}>
                            {categoryInfo.icon} {categoryInfo.name}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes_count}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Comentar</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Comunidade;
