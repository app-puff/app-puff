
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Trees, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface CriarMicroflorestaProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CriarMicrofloresta = ({ onBack, onSuccess }: CriarMicroflorestaProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location_name: '',
    trees_planned: 10,
    status: 'planning' as 'planning' | 'active' | 'completed'
  });
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar um projeto",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome do projeto é obrigatório",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from('microforest_projects')
        .insert([{
          ...formData,
          user_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Projeto criado!",
        description: `O projeto "${formData.name}" foi criado com sucesso`,
      });

      onSuccess();
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o projeto",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
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
              <Trees className="w-16 h-16 mx-auto text-gray-300 mb-4" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">🛠️ Criar Microfloresta</h1>
          <div></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Novo Projeto de Microfloresta</CardTitle>
            <CardDescription>
              Preencha as informações do seu projeto para começar a plantação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome do Projeto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Microfloresta da Escola Verde"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        value={formData.location_name}
                        onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                        placeholder="Ex: Parque da Cidade, São Paulo - SP"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="trees_planned">Quantidade de Árvores Planejadas</Label>
                    <div className="relative">
                      <Trees className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="trees_planned"
                        type="number"
                        min="1"
                        value={formData.trees_planned}
                        onChange={(e) => setFormData({ ...formData, trees_planned: parseInt(e.target.value) || 1 })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status do Projeto</Label>
                    <Select value={formData.status} onValueChange={(value: 'planning' | 'active' | 'completed') => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planejando</SelectItem>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição do Projeto</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva os objetivos, benefícios esperados e detalhes do seu projeto..."
                    className="h-32 resize-none"
                  />
                  
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">💡 Dicas para seu projeto:</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Escolha espécies nativas da sua região</li>
                      <li>• Considere o espaço disponível e condições do solo</li>
                      <li>• Planeje a manutenção e cuidados necessários</li>
                      <li>• Envolva a comunidade local no projeto</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-puff-green hover:bg-puff-green/90"
                >
                  {saving ? (
                    <>Salvando...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Criar Projeto
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CriarMicrofloresta;
