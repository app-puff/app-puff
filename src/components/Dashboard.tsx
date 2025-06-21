
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Menu, Users, Target, BookOpen, MapPin, Sprout, Plus, BarChart3, Settings } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [notifications] = useState(3);

  const dashboardCards = [
    {
      id: 'map',
      title: 'Mapa Verde',
      description: 'Explore projetos de microflorestas',
      icon: <MapPin className="w-8 h-8" />,
      color: 'bg-blue-500',
      stats: '127 projetos ativos'
    },
    {
      id: 'plantings',
      title: 'Meus Plantios',
      description: 'Gerencie seus projetos',
      icon: <Sprout className="w-8 h-8" />,
      color: 'bg-puff-green',
      stats: '3 projetos em andamento'
    },
    {
      id: 'create',
      title: 'Criar Microfloresta',
      description: 'Inicie um novo projeto',
      icon: <Plus className="w-8 h-8" />,
      color: 'bg-orange-500',
      stats: 'Plano personalizado'
    },
    {
      id: 'guide',
      title: 'Guia PUFF',
      description: 'Centro de conhecimento',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-purple-500',
      stats: '50+ artigos'
    },
    {
      id: 'challenges',
      title: 'Desafios e Ranking',
      description: 'Gamificação e conquistas',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-yellow-500',
      stats: 'Nível 7 - Guardião'
    },
    {
      id: 'community',
      title: 'Comunidade PUFF',
      description: 'Fórum e colaboração',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-pink-500',
      stats: '1.2k membros ativos'
    },
    {
      id: 'impact',
      title: 'Impacto Ambiental',
      description: 'Métricas de sustentabilidade',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-green-600',
      stats: '2.5t CO₂ capturado'
    },
    {
      id: 'profile',
      title: 'Perfil e Configurações',
      description: 'Suas informações pessoais',
      icon: <Settings className="w-8 h-8" />,
      color: 'bg-gray-500',
      stats: 'Perfil completo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-3">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-puff-green rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌱</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-puff-green">PUFF</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium">Olá, Thais! 👋</p>
                <p className="text-xs text-gray-500">Bem-vinda de volta</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-puff-gradient rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Pronta para plantar hoje?</h2>
              <p className="text-white/90 mb-4">
                Sua jornada sustentável continua. Que tal conferir novos desafios ou atualizar seus projetos?
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="secondary" 
                  onClick={() => onNavigate('create')}
                  className="bg-white text-puff-green hover:bg-white/90"
                >
                  Criar Projeto
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('challenges')}
                  className="border-white text-white hover:bg-white/10"
                >
                  Ver Desafios
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
              <div className="text-8xl animate-leaf-sway">🌿</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Mudas Plantadas</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <Sprout className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Área Verde (m²)</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Desafios</p>
                  <p className="text-2xl font-bold">15/20</p>
                </div>
                <Target className="w-8 h-8 text-yellow-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Comunidade</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Users className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardCards.map((card) => (
            <Card 
              key={card.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
              onClick={() => onNavigate(card.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${card.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                    {card.icon}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-puff-green transition-colors">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline-block">
                  {card.stats}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas atualizações dos seus projetos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-puff-green rounded-full flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Microfloresta da Escola Verde crescendo bem!</p>
                    <p className="text-xs text-gray-500">Há 2 horas • +5 XP</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Desafio "20 mudas em Junho" concluído! 🎉</p>
                    <p className="text-xs text-gray-500">Ontem • +50 XP</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">3 novos membros seguiram seu projeto</p>
                    <p className="text-xs text-gray-500">2 dias atrás</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
