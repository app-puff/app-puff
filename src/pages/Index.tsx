
import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';

type Screen = 'splash' | 'auth' | 'dashboard' | 'map' | 'plantings' | 'create' | 'guide' | 'challenges' | 'community' | 'impact' | 'profile';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleGuestAccess = () => {
    setIsAuthenticated(false);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    // Por enquanto, todas as navegações voltam para o dashboard
    // Nas próximas iterações, criaremos as telas específicas
    console.log(`Navigating to: ${screen}`);
    if (screen === 'dashboard' || screen === 'home') {
      setCurrentScreen('dashboard');
    } else {
      // Placeholder para outras telas
      alert(`Tela "${screen}" será implementada na próxima versão! 🌱`);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'auth':
        return <AuthScreen onLogin={handleLogin} onGuestAccess={handleGuestAccess} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
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

export default Index;
