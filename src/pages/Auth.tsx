
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import AuthScreen from '@/components/AuthScreen';

const Auth = () => {
  const { user, isGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || isGuest) {
      navigate('/dashboard');
    }
  }, [user, isGuest, navigate]);

  const handleLogin = () => {
    navigate('/dashboard');
  };

  const handleGuestAccess = () => {
    const { signInAsGuest } = useAuth();
    signInAsGuest();
    navigate('/dashboard');
  };

  if (user || isGuest) {
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
