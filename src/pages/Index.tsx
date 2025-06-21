
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import MapaVerde from '@/components/MapaVerde';
import MeusPlantios from '@/components/MeusPlantios';
import CriarMicrofloresta from '@/components/CriarMicrofloresta';

type Screen = 'splash' | 'auth' | 'dashboard' | 'map' | 'plantings' | 'create' | 'guide' | 'challenges' | 'community' | 'impact' | 'profile';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentScreen('dashboard');
      } else if (currentScreen === 'splash') {
        // Only show auth screen if we're still on splash and not logged in
        setTimeout(() => setCurrentScreen('auth'), 100);
      }
    }
  }, [user, loading, currentScreen]);

  const handleSplashComplete = () => {
    if (!user) {
      setCurrentScreen('auth');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleGuestAccess = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    console.log(`Navigating to: ${screen}`);
    
    switch (screen) {
      case 'dashboard':
      case 'home':
        setCurrentScreen('dashboard');
        break;
      case 'map':
        setCurrentScreen('map');
        break;
      case 'plantings':
        setCurrentScreen('plantings');
        break;
      case 'create':
        setCurrentScreen('create');
        break;
      case 'guide':
      case 'challenges':
      case 'community':
      case 'impact':
      case 'profile':
        alert(`Tela "${screen}" será implementada na próxima versão! 🌱`);
        break;
      default:
        alert(`Tela "${screen}" será implementada na próxima versão! 🌱`);
    }
  };

  const renderScreen = () => {
    if (loading) {
      return <SplashScreen onComplete={() => {}} />;
    }

    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'auth':
        return <AuthScreen onLogin={handleLogin} onGuestAccess={handleGuestAccess} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'map':
        return <MapaVerde onBack={() => setCurrentScreen('dashboard')} />;
      case 'plantings':
        return (
          <MeusPlantios 
            onBack={() => setCurrentScreen('dashboard')}
            onCreateNew={() => setCurrentScreen('create')}
          />
        );
      case 'create':
        return (
          <CriarMicrofloresta 
            onBack={() => setCurrentScreen('dashboard')}
            onSuccess={() => setCurrentScreen('plantings')}
          />
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
