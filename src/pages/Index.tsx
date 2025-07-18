
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate('/dashboard');
      } else {
        setTimeout(() => {
          setShowSplash(false);
          navigate('/auth');
        }, 2000);
      }
    }
  }, [user, loading, navigate]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  if (loading || showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return null;
};

export default Index;
