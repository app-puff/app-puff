
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import CriarMicrofloresta from '@/components/CriarMicrofloresta';

const CriarMicroflorestaPage = () => {
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

  const handleSuccess = () => {
    navigate('/meus-plantios');
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white flex items-center justify-center">
      <div>Carregando...</div>
    </div>;
  }

  if (!user) {
    return null;
  }

  return <CriarMicrofloresta onBack={handleBack} onSuccess={handleSuccess} />;
};

export default CriarMicroflorestaPage;
