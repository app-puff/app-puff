
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import Guia from '@/components/Guia';

const GuiaPage = () => {
  const { user, isGuest, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      navigate('/auth');
    }
  }, [user, isGuest, loading, navigate]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white flex items-center justify-center">
      <div>Carregando...</div>
    </div>;
  }

  if (!user && !isGuest) {
    return null;
  }

  return <Guia onBack={handleBack} />;
};

export default GuiaPage;
