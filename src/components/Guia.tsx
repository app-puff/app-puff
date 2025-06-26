import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, BookOpen, Leaf, Droplet, Sun, Bug, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface GuiaProps {
  onBack: () => void;
}
const Guia = ({
  onBack
}: GuiaProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const categorias = [{
    id: 'all',
    nome: 'Todos',
    icon: <BookOpen className="w-4 h-4" />
  }, {
    id: 'especies',
    nome: 'Espécies Nativas',
    icon: <Leaf className="w-4 h-4" />
  }, {
    id: 'solo',
    nome: 'Preparação do Solo',
    icon: <Sun className="w-4 h-4" />
  }, {
    id: 'agua',
    nome: 'Irrigação',
    icon: <Droplet className="w-4 h-4" />
  }, {
    id: 'manutencao',
    nome: 'Manutenção',
    icon: <Bug className="w-4 h-4" />
  }, {
    id: 'compostagem',
    nome: 'Compostagem',
    icon: <Recycle className="w-4 h-4" />
  }];
  const artigos = [{
    id: 1,
    titulo: 'Como Preparar o Solo para Microflorestas',
    resumo: 'Guia completo sobre análise e preparação do solo antes do plantio',
    categoria: 'solo',
    tempo: '8 min leitura',
    nivel: 'Iniciante',
    imagem: '🌱'
  }, {
    id: 2,
    titulo: 'Espécies Nativas do Cerrado',
    resumo: 'Conheça as principais espécies nativas recomendadas para sua região',
    categoria: 'especies',
    tempo: '12 min leitura',
    nivel: 'Intermediário',
    imagem: '🌳'
  }, {
    id: 3,
    titulo: 'Sistema de Irrigação por Gotejamento',
    resumo: 'Como criar um sistema eficiente de irrigação para sua microfloresta',
    categoria: 'agua',
    tempo: '6 min leitura',
    nivel: 'Intermediário',
    imagem: '💧'
  }, {
    id: 4,
    titulo: 'Compostagem Escolar e Comunitária',
    resumo: 'Transforme resíduos orgânicos em adubo rico para suas plantas',
    categoria: 'compostagem',
    tempo: '10 min leitura',
    nivel: 'Iniciante',
    imagem: '♻️'
  }, {
    id: 5,
    titulo: 'Controle Natural de Pragas',
    resumo: 'Métodos sustentáveis para proteger suas mudas sem agrotóxicos',
    categoria: 'manutencao',
    tempo: '7 min leitura',
    nivel: 'Avançado',
    imagem: '🐛'
  }, {
    id: 6,
    titulo: 'Calendário de Plantio Regional',
    resumo: 'Saiba a melhor época para plantar cada espécie em sua região',
    categoria: 'especies',
    tempo: '5 min leitura',
    nivel: 'Iniciante',
    imagem: '📅'
  }, {
    id: 7,
    titulo: 'Captação e Armazenamento de Água da Chuva',
    resumo: 'Técnicas simples para aproveitar a água da chuva na irrigação',
    categoria: 'agua',
    tempo: '9 min leitura',
    nivel: 'Intermediário',
    imagem: '🌧️'
  }, {
    id: 8,
    titulo: 'Manutenção Sazonal de Microflorestas',
    resumo: 'Cuidados específicos para cada estação do ano',
    categoria: 'manutencao',
    tempo: '11 min leitura',
    nivel: 'Intermediário',
    imagem: '🗓️'
  }];
  const artigosFiltrados = artigos.filter(artigo => {
    const matchesSearch = artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || artigo.resumo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artigo.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleArticleClick = (articleId: number) => {
    navigate(`/guia/artigo/${articleId}`);
  };
  return <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">📚 Guia PUFF</h1>
          <div></div>
        </div>

        {/* Barra de Pesquisa */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar artigos, tutoriais e guias..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(categoria => <Button key={categoria.id} variant={selectedCategory === categoria.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(categoria.id)} className="flex items-center space-x-2">
              {categoria.icon}
              <span>{categoria.nome}</span>
            </Button>)}
        </div>

        {/* Artigos em Destaque */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">📖 Centro de Conhecimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artigosFiltrados.map(artigo => <Card key={artigo.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1" onClick={() => handleArticleClick(artigo.id)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{artigo.imagem}</div>
                    <Badge className={getNivelColor(artigo.nivel)}>
                      {artigo.nivel}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{artigo.titulo}</CardTitle>
                  <CardDescription>{artigo.resumo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{artigo.tempo}</span>
                    <Badge variant="outline" className="text-xs">
                      {categorias.find(c => c.id === artigo.categoria)?.nome}
                    </Badge>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Recursos Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Biblioteca Digital
              </CardTitle>
              <CardDescription>PDFs, vídeos e materiais educativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Manual Completo de Microflorestas</span>
                  <Button size="sm" variant="outline">Baixar PDF</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Vídeoaula: Plantio Passo a Passo</span>
                  <Button size="sm" variant="outline">Assistir</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Checklist de Manutenção</span>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-600" />
                Oficinas e Eventos
              </CardTitle>
              <CardDescription>Aprenda na prática com especialistas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium">Oficina de Compostagem</h4>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Próximo</span>
                  </div>
                  <p className="text-xs text-gray-600">15 de Agosto • 14h00 • Centro Comunitário</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium">Mutirão de Plantio</h4>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Inscrições Abertas</span>
                  </div>
                  <p className="text-xs text-gray-600">22 de Agosto • 08h00 • ETE Centro</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium">Curso Online: Espécies Nativas</h4>
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Em Breve</span>
                  </div>
                  <p className="text-xs text-gray-600">Agosto • Online • 4 módulos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Guia;