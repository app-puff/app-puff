import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Trees, Calendar, Users, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  name: string;
  description: string;
  location_name: string;
  trees_planned: number;
  trees_planted: number;
  status: string;
  created_at: string;
  user_profiles: {
    full_name: string;
  } | null;
}

interface MapaVerdeProps {
  onBack: () => void;
}

const MapaVerde = ({ onBack }: MapaVerdeProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('microforest_projects')
        .select(`
          *,
          user_profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning': return 'Planejando';
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      default: return 'Desconhecido';
    }
  };

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedProject(null)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Mapa
          </Button>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-puff-green">{selectedProject.name}</CardTitle>
                <Badge className={`${getStatusColor(selectedProject.status)} text-white`}>
                  {getStatusText(selectedProject.status)}
                </Badge>
              </div>
              <CardDescription>
                Criado por {selectedProject.user_profiles?.full_name || 'Usuário'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Informações do Projeto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedProject.location_name || 'Localização não informada'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Trees className="w-4 h-4 mr-2" />
                      {selectedProject.trees_planted} de {selectedProject.trees_planned} árvores plantadas
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Criado em {new Date(selectedProject.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-puff-green h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((selectedProject.trees_planted / selectedProject.trees_planned) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {Math.round((selectedProject.trees_planted / selectedProject.trees_planned) * 100)}% concluído
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.description || 'Nenhuma descrição disponível.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">🗺️ Mapa Verde</h1>
          <div></div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Projetos de Microflorestas</CardTitle>
            <CardDescription>
              Explore projetos de microflorestas criados pela comunidade PUFF
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Trees className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-500">
                Seja o primeiro a criar um projeto de microfloresta!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                  <CardDescription>
                    por {project.user_profiles?.full_name || 'Usuário'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location_name || 'Localização não informada'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Trees className="w-4 h-4 mr-2" />
                      {project.trees_planted} de {project.trees_planned} árvores
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-puff-green h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((project.trees_planted / project.trees_planned) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapaVerde;
