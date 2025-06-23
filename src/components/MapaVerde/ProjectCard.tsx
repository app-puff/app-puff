
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Sprout, User } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  location_name: string;
  trees_planned: number;
  trees_planted: number;
  status: string;
  created_at: string;
  user_profiles: { full_name: string };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'planning': return 'Planejamento';
      case 'completed': return 'Concluído';
      default: return 'Desconhecido';
    }
  };

  const progressPercentage = project.trees_planned > 0 
    ? Math.round((project.trees_planted / project.trees_planned) * 100)
    : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {project.description || 'Sem descrição disponível'}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(project.status)} text-white`}>
            {getStatusText(project.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{project.location_name || 'Local não especificado'}</span>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{project.user_profiles?.full_name || 'Usuário'}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Sprout className="w-4 h-4 text-green-600" />
              <span>Progresso</span>
            </div>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>{project.trees_planted} plantadas</span>
            <span>{project.trees_planned} planejadas</span>
          </div>
        </div>

        {/* Date */}
        <div className="text-xs text-gray-400 pt-2 border-t">
          Criado em {new Date(project.created_at).toLocaleDateString('pt-BR')}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
