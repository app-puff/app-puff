
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, BookOpen, MapPin, Sprout, Plus, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/LogoutButton';
import SideMenu from '@/components/SideMenu';
import NotificationPanel from '@/components/NotificationPanel';

const Dashboard = () => {
  const [notifications] = useState(3);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();
  const { user, isGuest, signOut } = useAuth();
  
  // Generate dynamic recent activities
  useEffect(() => {
    const activities = [
      {
        id: 1,
        type: 'plant_growth',
        message: 'Microfloresta da Escola Verde crescendo bem!',
        time: `Há ${Math.floor(Math.random() * 5) + 1} horas`,
        xp: 5,
        color: 'green'
      },
      {
        id: 2,
        type: 'challenge_completed',
        message: `Desafio "${Math.random() > 0.5 ? '20 mudas em Junho' : 'Guardião da Biodiversidade'}" concluído! 🎉`,
        time: `${Math.floor(Math.random() * 3) + 1} dia${Math.floor(Math.random() * 3) + 1 > 1 ? 's' : ''} atrás`,
        xp: 50,
        color: 'blue'
      },
      {
        id: 3,
        type: 'community',
        message: `${Math.floor(Math.random() * 5) + 1} novos membros seguiram seu projeto`,
        time: `${Math.floor(Math.random() * 7) + 1} dias atrás`,
        xp: 0,
        color: 'purple'
      },
      {
        id: 4,
        type: 'maintenance',
        message: 'Checklist de manutenção concluído no Projeto Verde',
        time: `${Math.floor(Math.random() * 12) + 1} horas atrás`,
        xp: 10,
        color: 'yellow'
      }
    ];
    
    // Shuffle and take 3 random activities
    const shuffled = activities.sort(() => 0.5 - Math.random());
    setRecentActivities(shuffled.slice(0, 3));
  }, []);

  // Get user name for greeting
  const getUserName = () => {
    if (isGuest) return 'Puffer';
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  };

  const handleGuestLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'plant_growth': return <Sprout className="w-5 h-5 text-white" />;
      case 'challenge_completed': return <Target className="w-5 h-5 text-white" />;
      case 'community': return <Users className="w-5 h-5 text-white" />;
      case 'maintenance': return <Settings className="w-5 h-5 text-white" />;
      default: return <Sprout className="w-5 h-5 text-white" />;
    }
  };

  const getActivityBgColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-puff-green';
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-puff-green';
    }
  };

  const dashboardCards = [
    {
      id: 'map',
      title: 'Mapa Verde',
      description: 'Explore projetos de microflorestas',
      icon: <MapPin className="w-8 h-8" />,
      color: 'bg-blue-500',
      stats: '127 projetos ativos',
      url: '/mapa-verde'
    },
    {
      id: 'plantings',
      title: 'Meus Plantios',
      description: 'Gerencie seus projetos',
      icon: <Sprout className="w-8 h-8" />,
      color: 'bg-puff-green',
      stats: '3 projetos em andamento',
      url: '/meus-plantios'
    },
    {
      id: 'create',
      title: 'Criar Microfloresta',
      description: 'Inicie um novo projeto',
      icon: <Plus className="w-8 h-8" />,
      color: 'bg-orange-500',
      stats: 'Plano personalizado',
      url: '/criar-microfloresta'
    },
    {
      id: 'guide',
      title: 'Guia PUFF',
      description: 'Centro de conhecimento',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-purple-500',
      stats: '50+ artigos',
      url: '/guia'
    },
    {
      id: 'challenges',
      title: 'Desafios e Ranking',
      description: 'Gamificação e conquistas',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-yellow-500',
      stats: 'Nível 7 - Guardião',
      url: '/desafios'
    },
    {
      id: 'community',
      title: 'Comunidade PUFF',
      description: 'Fórum e colaboração',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-pink-500',
      stats: '1.2k membros ativos',
      url: '/comunidade'
    }
  ];

  const handleCardClick = (url: string) => {
    navigate(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <SideMenu />
              <div className="flex items-center space-x-3 ml-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <img 
                    src="/lovable-uploads/57eb8af7-f2d4-425c-8bd1-b77ac8e26012.png" 
                    alt="PUFF" 
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-puff-green">PUFF</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationPanel notificationCount={notifications} />
              <div className="text-right">
                <p className="text-sm font-medium">Olá, {getUserName()}! 👋</p>
                <p className="text-xs text-gray-500">
                  {isGuest ? 'Modo visitante ativo' : 'Bem-vindo de volta'}
                </p>
              </div>
              {isGuest ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGuestLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </Button>
              ) : (
                <LogoutButton />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map(card => (
            <Card 
              key={card.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group" 
              onClick={() => handleCardClick(card.url)}
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
                {recentActivities.map((activity: any) => (
                  <div key={activity.id} className={`flex items-center space-x-4 p-3 ${activity.color === 'green' ? 'bg-green-50' : activity.color === 'blue' ? 'bg-blue-50' : activity.color === 'purple' ? 'bg-purple-50' : 'bg-yellow-50'} rounded-lg`}>
                    <div className={`w-10 h-10 ${getActivityBgColor(activity.color)} rounded-full flex items-center justify-center`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {activity.time}
                        {activity.xp > 0 && ` • +${activity.xp} XP`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
