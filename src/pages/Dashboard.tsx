
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

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white flex items-center justify-center">
      <div>Carregando...</div>
    </div>;
  }

  if (!user) {
    return null;
  }

  return <Dashboard />;
};

export default DashboardPage;
