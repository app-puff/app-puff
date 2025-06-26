import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TreePineIcon, Leaf } from 'lucide-react';
const LandingPage = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-puff-green text-white p-2 rounded-full">
              <TreePineIcon className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-puff-green">PUFF</span>
          </div>
          
          <Button onClick={() => navigate('/auth')} className="bg-puff-green hover:bg-puff-green/90">
            Entrar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Bem-vindo ao PUFF 🌱</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Explore e acompanhe projetos de microflorestas no Brasil
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <Leaf className="w-8 h-8 text-green-400" />
          <TreePineIcon className="w-12 h-12 text-puff-green" />
          <Leaf className="w-8 h-8 text-green-400" />
        </div>

        {/* Main CTA */}
        <div className="mb-16">
          <Button onClick={() => navigate('/mapa-verde')} size="lg" className="bg-puff-green hover:bg-puff-green/90 text-lg px-8 py-4 h-auto">
            Ver Projetos no Mapa
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              🌳
            </div>
            <h3 className="text-lg font-semibold mb-2">Microflorestas</h3>
            <p className="text-gray-600">Descubra projetos de reflorestamento urbano</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              🗺️
            </div>
            <h3 className="text-lg font-semibold mb-2">Mapeamento</h3>
            <p className="text-gray-600">Visualize projetos em tempo real no mapa</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              🤝
            </div>
            <h3 className="text-lg font-semibold mb-2">Comunidade</h3>
            <p className="text-gray-600">Conecte-se com outros defensores do meio ambiente</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            Siga-nos no Instagram
          </p>
          <a href="https://instagram.com/aplicativopuff" target="_blank" rel="noopener noreferrer" className="text-puff-green hover:text-puff-green/80 font-medium">
            @aplicativopuff
          </a>
          <div className="mt-4 text-sm text-gray-500">
            © 2024 PUFF - Plante Um Futuro Feliz
          </div>
        </div>
      </footer>
    </div>;
};
export default LandingPage;