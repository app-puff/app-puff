
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MapaVerdeHeader from './MapaVerde/MapaVerdeHeader';
import ProjectsGrid from './MapaVerde/ProjectsGrid';

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
      
      // First, get projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('microforest_projects')
        .select(`
          id,
          name,
          description,
          location_name,
          trees_planned,
          trees_planted,
          status,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // Then get user profiles separately to avoid join issues
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('id, full_name');

      if (profilesError) {
        console.warn('Could not fetch user profiles:', profilesError);
      }

      // Transform the data to match our Project interface
      const transformedData: Project[] = (projectsData || []).map(project => {
        // Find the matching user profile
        const userProfile = profilesData?.find(profile => profile.id === project.user_id);
        
        return {
          id: project.id,
          name: project.name,
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
        <MapaVerdeHeader 
          onBack={onBack}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mt-8">
          <ProjectsGrid projects={filteredProjects} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default MapaVerde;
