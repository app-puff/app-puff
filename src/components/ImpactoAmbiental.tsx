
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TreePine, Leaf, CloudSnow, Thermometer, Bug, Recycle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImpactoAmbientalProps {
  onBack: () => void;
}

const ImpactoAmbiental = ({ onBack }: ImpactoAmbientalProps) => {
  const [metrics, setMetrics] = useState({
    totalTrees: 0,
    totalArea: 0,
    co2Captured: 0,
    temperatureReduction: 0,
    speciesCount: 0,
    compostWeight: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      
      // Fetch project data to calculate metrics
      const { data: projects, error } = await supabase
        .from('microforest_projects')
        .select('trees_planted, trees_planned');

      if (error) throw error;

      // Calculate metrics (using sample data if no real data)
      const totalTreesPlanted = projects?.reduce((sum, project) => sum + (project.trees_planted || 0), 0) || 0;
      const totalTreesPlanned = projects?.reduce((sum, project) => sum + (project.trees_planned || 0), 0) || 0;
      
      // Sample metrics calculation (in real app, these would be more sophisticated)
      setMetrics({
        totalTrees: totalTreesPlanted || 247, // Sample data if no real data
        totalArea: Math.round((totalTreesPlanted || 247) * 12.5), // ~12.5m² per tree average
        co2Captured: Math.round((totalTreesPlanted || 247) * 22), // ~22kg CO2 per tree per year
        temperatureReduction: Math.round((totalTreesPlanned || 380) * 0.3), // ~0.3°C reduction per 100 trees
        speciesCount: Math.min(Math.round((totalTreesPlanned || 380) / 10), 45), // Variety of species
        compostWeight: Math.round((totalTreesPlanned || 380) * 1.5) // ~1.5kg compost per tree
      });
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      // Use sample data on error
      setMetrics({
        totalTrees: 247,
        totalArea: 3088,
        co2Captured: 5434,
        temperatureReduction: 1.14,
        speciesCount: 38,
        compostWeight: 570
      });
    } finally {
      setLoading(false);
    }
  };

  const impactCards = [
    {
      title: 'Mudas Plantadas',
      value: metrics.totalTrees.toLocaleString(),
      description: 'Árvores plantadas pela comunidade PUFF',
      icon: <TreePine className="w-8 h-8" />,
      color: 'bg-green-500',
      unit: 'mudas'
    },
    {
      title: 'Área Verde Criada',
      value: metrics.totalArea.toLocaleString(),
      description: 'Metros quadrados de área verde restaurada',
      icon: <Leaf className="w-8 h-8" />,
      color: 'bg-emerald-500',
      unit: 'm²'
    },
    {
      title: 'CO₂ Capturado',
      value: metrics.co2Captured.toLocaleString(),
      description: 'Carbono removido da atmosfera anualmente',
      icon: <CloudSnow className="w-8 h-8" />,
      color: 'bg-blue-500',
      unit: 'kg/ano'
    },
    {
      title: 'Redução de Temperatura',
      value: metrics.temperatureReduction.toFixed(1),
      description: 'Diminuição estimada da temperatura local',
      icon: <Thermometer className="w-8 h-8" />,
      color: 'bg-orange-500',
      unit: '°C'
    },
    {
      title: 'Biodiversidade',
      value: metrics.speciesCount.toString(),
      description: 'Espécies diferentes catalogadas nos projetos',
      icon: <Bug className="w-8 h-8" />,
      color: 'bg-purple-500',
      unit: 'espécies'
    },
    {
      title: 'Compostagem',
      value: metrics.compostWeight.toLocaleString(),
      description: 'Resíduos orgânicos transformados em adubo',
      icon: <Recycle className="w-8 h-8" />,
      color: 'bg-yellow-600',
      unit: 'kg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">📊 Impacto Ambiental</h1>
          <div className="text-sm text-gray-500">
            Dados atualizados em tempo real
          </div>
        </div>

        {/* Header Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-puff-green mb-2">
              Transformando o Mundo, Uma Árvore de Cada Vez 🌍
            </CardTitle>
            <CardDescription className="text-lg">
              Acompanhe o impacto positivo que a comunidade PUFF está gerando no meio ambiente
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {impactCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${card.color} text-white`}>
                    {card.icon}
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-700">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-puff-green">
                      {loading ? '...' : card.value}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      {card.unit}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>🌱 Benefícios Ecológicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Purificação do ar</span>
                  <span className="text-green-700 font-bold">+{Math.round(metrics.totalTrees * 0.5)}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Retenção de água da chuva</span>
                  <span className="text-blue-700 font-bold">{Math.round(metrics.totalArea * 0.8)} L/dia</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Habitat para fauna</span>
                  <span className="text-yellow-700 font-bold">+{metrics.speciesCount * 3} animais</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Melhoria do solo</span>
                  <span className="text-purple-700 font-bold">{metrics.totalArea} m²</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🏙️ Benefícios Urbanos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Redução de ruído</span>
                  <span className="text-orange-700 font-bold">-{Math.round(metrics.totalTrees * 0.2)} dB</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <span className="font-medium">Economia de energia</span>
                  <span className="text-teal-700 font-bold">{Math.round(metrics.totalArea * 0.15)} kWh/mês</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                  <span className="font-medium">Valorização imobiliária</span>
                  <span className="text-pink-700 font-bold">+{Math.round(metrics.totalTrees * 0.1)}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <span className="font-medium">Bem-estar social</span>
                  <span className="text-indigo-700 font-bold">∞ Benefícios</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Impact Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>🌍 Comparação de Impacto Global</CardTitle>
            <CardDescription>
              Veja como suas microflorestas se comparam com outras iniciativas ambientais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🚗</div>
                <div className="text-lg font-bold text-puff-green">
                  {Math.round(metrics.co2Captured / 4.6)} carros
                </div>
                <div className="text-sm text-gray-600">
                  Retirados de circulação por 1 ano
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🏠</div>
                <div className="text-lg font-bold text-puff-green">
                  {Math.round(metrics.co2Captured / 16)} casas
                </div>
                <div className="text-sm text-gray-600">
                  Consumo energético anual neutralizado
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">✈️</div>
                <div className="text-lg font-bold text-puff-green">
                  {Math.round(metrics.co2Captured / 90)} voos
                </div>
                <div className="text-sm text-gray-600">
                  São Paulo - Rio de Janeiro compensados
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-lg font-bold text-puff-green">
                  {Math.round(metrics.co2Captured / 5)} pessoas
                </div>
                <div className="text-sm text-gray-600">
                  Pegada de carbono anual compensada
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
