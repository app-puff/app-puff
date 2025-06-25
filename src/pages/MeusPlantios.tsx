
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import MeusPlantios from '@/components/MeusPlantios';

const MeusPlantiosPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCreateNew = () => {
    navigate('/criar-microfloresta');
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white flex items-center justify-center">
      <div>Carregando...</div>
    </div>;
  }

  if (!user) {
    return null;
  }

  return <MeusPlantios onBack={handleBack} onCreateNew={handleCreateNew} />;
};

export default MeusPlantiosPage;
