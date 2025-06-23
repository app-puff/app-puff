
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, MapPin, Sprout, Target, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface CriarMicroflorestaProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CriarMicrofloresta = ({ onBack, onSuccess }: CriarMicroflorestaProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location_name: '',
    location_lat: null as number | null,
    location_lng: null as number | null,
    area_size: '',
    soil_type: '',
    sunlight: '',
    water_access: '',
    objective: '',
    trees_planned: 10
  });

  const totalSteps = 5;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar um projeto",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('microforest_projects')
        .insert([
          {
            name: formData.name,
            description: formData.description,
            location_name: formData.location_name,
            location_lat: formData.location_lat,
            location_lng: formData.location_lng,
            trees_planned: formData.trees_planned,
            trees_planted: 0,
            status: 'planning',
            user_id: user.id
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Projeto criado com sucesso!",
        description: "Sua microfloresta foi cadastrada e já aparece no mapa",
      });

      onSuccess();
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o projeto. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
        <div className="max-w-4xl mx-auto text-center">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Card>
            <CardContent className="py-12">
              <Sprout className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Faça login para criar projetos
              </h3>
              <p className="text-gray-500">
                Você precisa estar logado para criar uma microfloresta
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Microfloresta da Escola Verde"
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva o objetivo e características do seu projeto"
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={formData.location_name}
                onChange={(e) => handleInputChange('location_name', e.target.value)}
                placeholder="Ex: Rua das Flores, 123 - Bairro Verde"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-sm text-blue-700">
                💡 Dica: Você pode adicionar coordenadas GPS mais tarde para uma localização mais precisa no mapa
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="area_size">Área Disponível (m²)</Label>
              <Input
                id="area_size"
                value={formData.area_size}
                onChange={(e) => handleInputChange('area_size', e.target.value)}
                placeholder="Ex: 100"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="soil_type">Tipo de Solo</Label>
              <Select onValueChange={(value) => handleInputChange('soil_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de solo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Argiloso</SelectItem>
                  <SelectItem value="sandy">Arenoso</SelectItem>
                  <SelectItem value="loamy">Humoso</SelectItem>
                  <SelectItem value="mixed">Misto</SelectItem>
                  <SelectItem value="unknown">Não sei identificar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sunlight">Exposição Solar</Label>
              <Select onValueChange={(value) => handleInputChange('sunlight', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a exposição solar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Sol pleno (mais de 6h/dia)</SelectItem>
                  <SelectItem value="partial">Parcial (3-6h/dia)</SelectItem>
                  <SelectItem value="shade">Sombra (menos de 3h/dia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="water_access">Acesso à Água</Label>
              <Select onValueChange={(value) => handleInputChange('water_access', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Como será a irrigação?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tap">Torneira/mangueira</SelectItem>
                  <SelectItem value="rain">Água da chuva</SelectItem>
                  <SelectItem value="well">Poço artesiano</SelectItem>
                  <SelectItem value="river">Rio/córrego próximo</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="objective">Objetivo Principal</Label>
              <Select onValueChange={(value) => handleInputChange('objective', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Qual o objetivo principal?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shade">Criar sombra e conforto térmico</SelectItem>
                  <SelectItem value="biodiversity">Aumentar biodiversidade</SelectItem>
                  <SelectItem value="education">Educação ambiental</SelectItem>
                  <SelectItem value="food">Produção de alimentos</SelectItem>
                  <SelectItem value="air">Melhorar qualidade do ar</SelectItem>
                  <SelectItem value="erosion">Controle de erosão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="trees_planned">Número de Mudas Planejadas</Label>
              <Input
                id="trees_planned"
                value={formData.trees_planned}
                onChange={(e) => handleInputChange('trees_planned', parseInt(e.target.value) || 0)}
                type="number"
                min="1"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <Sprout className="w-5 h-5 mr-2" />
                Plano Gerado para sua Microfloresta
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Projeto:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Localização:</span>
                  <span className="font-medium">{formData.location_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mudas Planejadas:</span>
                  <span className="font-medium">{formData.trees_planned} mudas</span>
                </div>
                <div className="flex justify-between">
                  <span>Área Estimada:</span>
                  <span className="font-medium">{formData.area_size} m²</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📋 Checklist Pré-Plantio</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Analisar e preparar o solo</li>
                <li>✓ Escolher espécies nativas adequadas</li>
                <li>✓ Preparar sistema de irrigação</li>
                <li>✓ Delimitar área de plantio</li>
                <li>✓ Adquirir mudas e ferramentas</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">🛠️ Criar Microfloresta</h1>
          <div className="text-sm text-gray-500">
            {currentStep}/{totalSteps}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Informações Básicas'}
              {currentStep === 2 && 'Localização'}
              {currentStep === 3 && 'Dados do Espaço'}
              {currentStep === 4 && 'Objetivo e Planejamento'}
              {currentStep === 5 && 'Resumo do Projeto'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Vamos começar com o nome e descrição do seu projeto'}
              {currentStep === 2 && 'Onde será implementada sua microfloresta?'}
              {currentStep === 3 && 'Características do local de plantio'}
              {currentStep === 4 && 'Defina os objetivos do seu projeto'}
              {currentStep === 5 && 'Revise as informações antes de criar o projeto'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !formData.name) ||
                    (currentStep === 2 && !formData.location_name)
                  }
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-puff-green hover:bg-puff-green/90"
                >
                  {loading ? 'Criando...' : 'Criar Projeto'}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CriarMicrofloresta;
