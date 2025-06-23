
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Search, FileText, Video, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface GuideArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  image_url?: string;
  published_at: string;
}

interface GuiaProps {
  onBack: () => void;
}

const Guia = ({ onBack }: GuiaProps) => {
  const [articles, setArticles] = useState<GuideArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚', color: 'bg-gray-500' },
    { id: 'especies', name: 'Espécies Nativas', icon: '🌳', color: 'bg-green-500' },
    { id: 'solo', name: 'Preparo do Solo', icon: '🧑‍🌾', color: 'bg-brown-500' },
    { id: 'compostagem', name: 'Compostagem', icon: '♻️', color: 'bg-yellow-600' },
    { id: 'agua', name: 'Captação de Água', icon: '🚿', color: 'bg-blue-500' },
    { id: 'manutencao', name: 'Manutenção', icon: '🌿', color: 'bg-emerald-500' },
    { id: 'educacao', name: 'Atividades Educativas', icon: '🎨', color: 'bg-purple-500' },
  ];

  // Sample articles
  const sampleArticles = [
    {
      id: '1',
      title: 'Espécies Nativas da Mata Atlântica para Microflorestas',
      content: 'A Mata Atlântica é um dos biomas mais ricos em biodiversidade do mundo. Para criar microflorestas eficazes, é essencial conhecer as espécies nativas da região...',
      summary: 'Conheça as principais árvores nativas ideais para seu projeto de microfloresta',
      category: 'especies',
      published_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Como Preparar o Solo para Microflorestas Urbanas',
      content: 'O preparo adequado do solo é fundamental para o sucesso de qualquer microfloresta. Aprenda técnicas de análise, correção e enriquecimento do solo urbano...',
      summary: 'Técnicas essenciais para preparar e enriquecer o solo urbano',
      category: 'solo',
      published_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      title: 'Compostagem Escolar: Transformando Resíduos em Adubo',
      content: 'A compostagem é uma técnica sustentável que transforma resíduos orgânicos em adubo rico em nutrientes. Veja como implementar na sua escola...',
      summary: 'Guia completo para implementar compostagem em escolas e comunidades',
      category: 'compostagem',
      published_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: '4',
      title: 'Sistemas de Captação de Água da Chuva',
      content: 'A água da chuva pode ser uma excelente fonte de irrigação para microflorestas. Aprenda a criar sistemas simples e eficientes de captação...',
      summary: 'Crie sistemas sustentáveis de irrigação usando água da chuva',
      category: 'agua',
      published_at: new Date(Date.now() - 259200000).toISOString()
    },
    {
      id: '5',
      title: 'Manutenção e Cuidados com Microflorestas',
      content: 'Após o plantio, as microflorestas precisam de cuidados específicos para crescer saudáveis. Conheça técnicas de poda, adubação e controle de pragas...',
      summary: 'Mantenha sua microfloresta saudável com estas práticas essenciais',
      category: 'manutencao',
      published_at: new Date(Date.now() - 345600000).toISOString()
    },
    {
      id: '6',
      title: 'Atividades Educativas para Escolas',
      content: 'Transforme sua microfloresta em uma sala de aula ao ar livre. Descubra atividades práticas para engajar estudantes na educação ambiental...',
      summary: 'Atividades práticas para educação ambiental usando microflorestas',
      category: 'educacao',
      published_at: new Date(Date.now() - 432000000).toISOString()
    }
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('guide_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      // Use sample articles if no data exists
      setArticles(data && data.length > 0 ? data : sampleArticles);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      setArticles(sampleArticles);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">📚 Guia PUFF</h1>
          <div className="text-sm text-gray-500">
            Centro de Conhecimento
          </div>
        </div>

        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-puff-green" />
              <span>Central de Conhecimento</span>
            </CardTitle>
            <CardDescription>
              Aprenda tudo sobre microflorestas, desde o planejamento até a manutenção
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Buscar artigos, tutoriais..."
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

        {/* Quick Start Section */}
        <Card className="mb-6 bg-gradient-to-r from-puff-green/10 to-puff-sky/10">
          <CardHeader>
            <CardTitle>🚀 Início Rápido</CardTitle>
            <CardDescription>
              Novato em microflorestas? Comece por aqui!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">🌱</span>
                <span className="font-medium">Primeiros Passos</span>
                <span className="text-xs text-gray-500">Como começar seu projeto</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">📋</span>
                <span className="font-medium">Checklist Completo</span>
                <span className="text-xs text-gray-500">Lista de verificação</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">🎥</span>
                <span className="font-medium">Vídeo Tutorial</span>
                <span className="text-xs text-gray-500">Aprenda assistindo</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
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
            ))
          ) : filteredArticles.length === 0 ? (
            <div className="col-span-full">
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-gray-500">
                    Tente ajustar os filtros ou termo de busca
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const categoryInfo = getCategoryInfo(article.category);
              return (
                <Card key={article.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${categoryInfo.color} text-white`}>
                        {categoryInfo.icon} {categoryInfo.name}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <FileText className="w-3 h-3" />
                        <span>Artigo</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Ler Mais
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Resources Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📁 Recursos Adicionais</CardTitle>
            <CardDescription>
              Materiais complementares para download e consulta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Manual PDF</p>
                  <p className="text-xs text-gray-500">Guia completo</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Video className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-sm">Vídeo Aulas</p>
                  <p className="text-xs text-gray-500">12 episódios</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Checklists</p>
                  <p className="text-xs text-gray-500">Listas práticas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-sm">E-books</p>
                  <p className="text-xs text-gray-500">Conteúdo extra</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Guia;
