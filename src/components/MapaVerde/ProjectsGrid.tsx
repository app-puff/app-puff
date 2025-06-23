
import ProjectCard from './ProjectCard';

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

interface ProjectsGridProps {
  projects: Project[];
  loading: boolean;
}

const ProjectsGrid = ({ projects, loading }: ProjectsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48"></div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌱</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nenhum projeto encontrado
        </h3>
        <p className="text-gray-500">
          Seja o primeiro a criar uma microfloresta!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
