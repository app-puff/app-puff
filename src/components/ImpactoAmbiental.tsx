
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TreePine, Droplets, Wind, Users, Leaf, Thermometer } from 'lucide-react';

interface ImpactoAmbientalProps {
  onBack: () => void;
}

const ImpactoAmbiental = ({ onBack }: ImpactoAmbientalProps) => {
  const metricas = [
    {
      icon: <TreePine className="w-8 h-8 text-green-600" />,
      titulo: "Mudas Plantadas",
      valor: "2,847",
      unidade: "árvores",
      crescimento: "+12% este mês",
      cor: "bg-green-50"
    },
    {
      icon: <Leaf className="w-8 h-8 text-blue-600" />,
      titulo: "Área Verde Criada",
      valor: "15,234",
      unidade: "m²",
      crescimento: "+8% este mês",
      cor: "bg-blue-50"
    },
    {
      icon: <Wind className="w-8 h-8 text-purple-600" />,
      titulo: "CO₂ Capturado",
      valor: "4.2",
      unidade: "toneladas",
      crescimento: "+15% este mês",
      cor: "bg-purple-50"
    },
    {
      icon: <Thermometer className="w-8 h-8 text-orange-600" />,
      titulo: "Redução de Temperatura",
      valor: "2.5",
      unidade: "°C estimado",
      crescimento: "Nas áreas plantadas",
      cor: "bg-orange-50"
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      titulo: "Pessoas Engajadas",
      valor: "1,247",
      unidade: "participantes",
      crescimento: "+23% este mês",
      cor: "bg-pink-50"
    },
    {
      icon: <Droplets className="w-8 h-8 text-cyan-600" />,
      titulo: "Água Conservada",
      valor: "850",
      unidade: "litros/dia",
      crescimento: "Através de captação",
      cor: "bg-cyan-50"
    }
  ];

  const projetos = [
    {
      nome: "Escola Verde Sustentável",
      arvores: 45,
      area: "320 m²",
      co2: "0.8 ton",
      status: "Ativo"
    },
    {
      nome: "Parque Comunitário Centro",
      arvores: 78,
      area: "650 m²", 
      co2: "1.2 ton",
      status: "Crescendo"
    },
    {
      nome: "Microfloresta Urbana Norte",
      arvores: 32,
      area: "280 m²",
      co2: "0.6 ton", 
      status: "Planejando"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">📊 Impacto Ambiental</h1>
          <div></div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metricas.map((metrica, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${metrica.cor} rounded-lg flex items-center justify-center mb-4`}>
                  {metrica.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{metrica.titulo}</h3>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{metrica.valor}</span>
                  <span className="text-sm text-gray-500">{metrica.unidade}</span>
                </div>
                <p className="text-xs text-green-600 font-medium">{metrica.crescimento}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impacto por Projeto */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Impacto por Projeto</CardTitle>
            <CardDescription>Veja como cada microfloresta contribui para o impacto ambiental</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projetos.map((projeto, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{projeto.nome}</h4>
                    <div className="flex space-x-6 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <TreePine className="w-4 h-4 mr-1" />
                        {projeto.arvores} árvores
                      </span>
                      <span className="flex items-center">
                        <Leaf className="w-4 h-4 mr-1" />
                        {projeto.area}
                      </span>
                      <span className="flex items-center">
                        <Wind className="w-4 h-4 mr-1" />
                        {projeto.co2} CO₂
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      projeto.status === 'Ativo' ? 'bg-green-100 text-green-800' :
                      projeto.status === 'Crescendo' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {projeto.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metas Ambientais */}
        <Card>
          <CardHeader>
            <CardTitle>Metas Ambientais 2024</CardTitle>
            <CardDescription>Nossos objetivos para este ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">3.000 Mudas Plantadas</span>
                  <span className="text-sm text-gray-500">2,847 / 3,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">20,000 m² de Área Verde</span>
                  <span className="text-sm text-gray-500">15,234 / 20,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">5 Toneladas de CO₂ Capturado</span>
                  <span className="text-sm text-gray-500">4.2 / 5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImpactoAmbiental;
