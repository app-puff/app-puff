
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    L: any;
  }
}

interface Project {
  id: string;
  name: string;
  location_name: string;
  trees_planned: number;
  trees_planted: number;
  status: string;
  user_profiles: { full_name: string };
}

interface InteractiveMapProps {
  projects: Project[];
}

const InteractiveMap = ({ projects }: InteractiveMapProps) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ color: '#2E7D32', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Mapa Verde
      </h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Explore projetos de microflorestas ao redor do mundo
      </p>
      
      <div 
        style={{ 
          height: '400px', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          backgroundImage: 'url(/lovable-uploads/47dbf495-57aa-43ff-85d2-b6f59db81bc5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
};

export default InteractiveMap;
