
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleNavigate = (screen: string) => {
    console.log(`Navigating to: ${screen}`);
    
    switch (screen) {
      case 'dashboard':
      case 'home':
        navigate('/dashboard');
        break;
      case 'map':
        navigate('/mapa-verde');
        break;
      case 'plantings':
        navigate('/meus-plantios');
        break;
      case 'create':
        navigate('/criar-microfloresta');
        break;
      case 'challenges':
        navigate('/desafios');
        break;
      case 'guide':
        navigate('/guia');
        break;
      case 'community':
        navigate('/comunidade');
        break;
      case 'impact':
        navigate('/impacto-ambiental');
        break;
      default:
        console.log(`Screen ${screen} not implemented yet`);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white flex items-center justify-center">
      <div>Carregando...</div>
    </div>;
  }

  if (!user) {
    return null;
  }

  return <Dashboard onNavigate={handleNavigate} />;
};

export default DashboardPage;
