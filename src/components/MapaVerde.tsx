
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import InteractiveMap from './MapaVerde/InteractiveMap';
import ProjectsGrid from './MapaVerde/ProjectsGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

interface MapaVerdeProps {
  onBack: () => void;
}

const MapaVerde = ({ onBack }: MapaVerdeProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Fetch projects with a simple query
      const { data: projectsData, error: projectsError } = await supabase
        .from('microforest_projects')
        .select('id, name, description, location_name, trees_planned, trees_planted, status, created_at, user_id')
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        throw projectsError;
      }

      // Fetch user profiles separately
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('id, full_name');

      if (profilesError) {
        console.warn('Could not fetch user profiles:', profilesError);
      }

      // Create a map of user profiles for easy lookup
      const profilesMap = new Map();
      if (profilesData) {
        profilesData.forEach(profile => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Transform the data to match our Project interface
      const transformedData: Project[] = (projectsData || []).map(project => {
        const userProfile = profilesMap.get(project.user_id);
        
        return {
          id: project.id,
          name: project.name || 'Projeto sem nome',
          description: project.description || '',
          location_name: project.location_name || '',
          trees_planned: project.trees_planned || 0,
          trees_planted: project.trees_planted || 0,
          status: project.status || 'planning',
          created_at: project.created_at,
          user_profiles: {
            full_name: userProfile?.full_name || 'Usuário Anônimo'
          }
        };
      });
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      setProjects([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Interactive Map Header */}
        <InteractiveMap projects={filteredProjects} />

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-puff-green focus:border-transparent"
          />
        </div>

        {/* Projects Grid */}
        <div className="mt-8">
          <ProjectsGrid projects={filteredProjects} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default MapaVerde;
