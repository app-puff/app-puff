
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Bell, Sprout, Users, Target, CheckCircle } from 'lucide-react';

interface NotificationPanelProps {
  notificationCount: number;
}

const NotificationPanel = ({ notificationCount }: NotificationPanelProps) => {
  const notifications = [
    {
      id: 1,
      type: 'project',
      title: 'Microfloresta da Escola Verde crescendo bem!',
      description: 'Seu projeto recebeu uma nova atualização',
      time: 'Há 2 horas',
      icon: <Sprout className="w-5 h-5 text-green-600" />,
      unread: true
    },
    {
      id: 2,
      type: 'challenge',
      title: 'Desafio "20 mudas em Junho" concluído! 🎉',
      description: 'Parabéns! Você ganhou +100 XP',
      time: 'Ontem',
      icon: <Target className="w-5 h-5 text-yellow-600" />,
      unread: true
    },
    {
      id: 3,
      type: 'community',
      title: '3 novos membros seguiram seu projeto',
      description: 'Parque Ecológico Comunitário está ganhando apoiadores',
      time: '2 dias atrás',
      icon: <Users className="w-5 h-5 text-purple-600" />,
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'Checklist de manutenção disponível',
      description: 'É hora de verificar suas plantas!',
      time: '3 dias atrás',
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
      unread: false
    }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {notificationCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notificações</span>
            <Badge variant="secondary">{notificationCount} novas</Badge>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {notification.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {notification.title}
                    </h4>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Ver todas as notificações
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
