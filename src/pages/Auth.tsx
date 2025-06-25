
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import AuthScreen from '@/components/AuthScreen';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = () => {
    navigate('/dashboard');
  };

  const handleGuestAccess = () => {
    navigate('/dashboard');
  };

  if (user) {
    return null;
  }

  return (
    <AuthScreen 
      onLogin={handleLogin} 
      onGuestAccess={handleGuestAccess} 
    />
  );
};

export default Auth;
