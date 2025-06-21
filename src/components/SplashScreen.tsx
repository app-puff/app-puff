
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowSlogan(true), 1000);
    const timer3 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-puff-gradient flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-32 w-28 h-28 rounded-full bg-white animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Logo */}
      <div className={`transform transition-all duration-1000 ${showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 animate-pulse-gentle">
            <div className="text-6xl font-bold text-puff-green">🌱</div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-2 animate-grow">PUFF</h1>
        </div>
      </div>

      {/* Slogan */}
      <div className={`transform transition-all duration-1000 delay-500 ${showSlogan ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <p className="text-xl text-center font-light tracking-wide">
          Plante Um Futuro Feliz
        </p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-puff-brown/20 to-transparent" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-8 h-12 bg-puff-green rounded-t-full animate-leaf-sway" />
          <div className="w-6 h-10 bg-puff-green rounded-t-full animate-leaf-sway" style={{ animationDelay: '0.5s' }} />
          <div className="w-10 h-14 bg-puff-green rounded-t-full animate-leaf-sway" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
