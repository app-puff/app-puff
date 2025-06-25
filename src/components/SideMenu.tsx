
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MapPin, Sprout, Plus, BookOpen, Target, Users, BarChart3, Settings, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', url: '/dashboard', icon: <Settings className="w-5 h-5" />, color: 'text-gray-600' },
    { id: 'map', title: 'Mapa Verde', url: '/mapa-verde', icon: <MapPin className="w-5 h-5" />, color: 'text-blue-600' },
    { id: 'plantings', title: 'Meus Plantios', url: '/meus-plantios', icon: <Sprout className="w-5 h-5" />, color: 'text-green-600' },
    { id: 'create', title: 'Criar Microfloresta', url: '/criar-microfloresta', icon: <Plus className="w-5 h-5" />, color: 'text-orange-600' },
    { id: 'guide', title: 'Guia de Plantio', url: '/guia', icon: <BookOpen className="w-5 h-5" />, color: 'text-purple-600' },
    { id: 'challenges', title: 'Desafios', url: '/desafios', icon: <Target className="w-5 h-5" />, color: 'text-yellow-600' },
    { id: 'community', title: 'Comunidade', url: '/comunidade', icon: <Users className="w-5 h-5" />, color: 'text-pink-600' },
    { id: 'impact', title: 'Impacto Ambiental', url: '/impacto-ambiental', icon: <BarChart3 className="w-5 h-5" />, color: 'text-emerald-600' },
  ];

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-puff-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🌱</span>
            </div>
            <span>PUFF</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start h-12 text-left hover:bg-puff-sky/10"
              onClick={() => handleNavigate(item.url)}
            >
              <span className={item.color}>{item.icon}</span>
              <span className="ml-3">{item.title}</span>
            </Button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-puff-gradient rounded-lg p-4 text-white text-center">
            <h4 className="font-semibold mb-1">🌿 Plante uma Ideia!</h4>
            <p className="text-sm text-white/90">
              Transforme sua comunidade com microflorestas
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
