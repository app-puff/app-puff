
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trees, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Project {
  id: string;
  name: string;
  description: string;
  location_name: string;
  trees_planned: number;
  trees_planted: number;
  status: string;
  created_at: string;
}

interface MeusPlantiosProps {
  onBack: () => void;
  onCreateNew: () => void;
}

const MeusPlantios = ({ onBack, onCreateNew }: MeusPlantiosProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyProjects();
    }
  }, [user]);

  const fetchMyProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('microforest_projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus projetos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleSaveEdit = async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from('microforest_projects')
        .update({
          name: updatedProject.name,
          description: updatedProject.description,
          location_name: updatedProject.location_name,
          trees_planned: updatedProject.trees_planned,
          trees_planted: updatedProject.trees_planted,
          status: updatedProject.status
        })
        .eq('id', updatedProject.id);

      if (error) throw error;

      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
      setEditingProject(null);
      
      toast({
        title: "Projeto atualizado",
        description: "As alterações foram salvas com sucesso",
      });
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (projectId: string, projectName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${projectName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('microforest_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Projeto excluído",
        description: `O projeto "${projectName}" foi excluído com sucesso`,
      });
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto",
        variant: "destructive"
      });
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
                Faça login para ver seus projetos
              </h3>
              <p className="text-gray-500">
                Você precisa estar logado para gerenciar seus plantios
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Edit Modal Component
  const EditModal = ({ project, onSave, onCancel }: { 
    project: Project; 
    onSave: (project: Project) => void; 
    onCancel: () => void; 
  }) => {
    const [editedProject, setEditedProject] = useState(project);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Editar Projeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                value={editedProject.name}
                onChange={(e) => setEditedProject({...editedProject, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                value={editedProject.description}
                onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Localização</label>
              <input
                type="text"
                value={editedProject.location_name}
                onChange={(e) => setEditedProject({...editedProject, location_name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Árvores Planejadas</label>
                <input
                  type="number"
                  value={editedProject.trees_planned}
                  onChange={(e) => setEditedProject({...editedProject, trees_planned: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Árvores Plantadas</label>
                <input
                  type="number"
                  value={editedProject.trees_planted}
                  onChange={(e) => setEditedProject({...editedProject, trees_planted: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={editedProject.status}
                onChange={(e) => setEditedProject({...editedProject, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="planning">Planejando</option>
                <option value="active">Ativo</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
            <div className="flex space-x-2 pt-4">
              <Button onClick={() => onSave(editedProject)} className="flex-1 bg-puff-green hover:bg-puff-green/90">
                Salvar
              </Button>
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">🌳 Meus Plantios</h1>
          <Button onClick={onCreateNew} className="bg-puff-green hover:bg-puff-green/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Seus Projetos de Microflorestas</CardTitle>
            <CardDescription>
              Gerencie e acompanhe o progresso dos seus projetos
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
                Você ainda não tem projetos
              </h3>
              <p className="text-gray-500 mb-6">
                Crie seu primeiro projeto de microfloresta e comece a fazer a diferença!
              </p>
              <Button onClick={onCreateNew} className="bg-puff-green hover:bg-puff-green/90">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Microfloresta
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                  <CardDescription>
                    Criado em {new Date(project.created_at).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location_name || 'Localização não informada'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Trees className="w-4 h-4 mr-2" />
                      {project.trees_planted} de {project.trees_planned} árvores
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-puff-green h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((project.trees_planted / project.trees_planned) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {Math.round((project.trees_planted / project.trees_planned) * 100)}% concluído
                    </p>

                    {project.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteProject(project.id, project.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingProject && (
          <EditModal
            project={editingProject}
            onSave={handleSaveEdit}
            onCancel={() => setEditingProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MeusPlantios;
