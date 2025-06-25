
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      // Wait for Leaflet to be available
      if (!window.L || !mapRef.current) return;

      // Clean up existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Wait a bit to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        // Initialize map
        const map = window.L.map(mapRef.current).setView([-7.94, -34.88], 12);

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Create green icon
        const greenIcon = new window.L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // Sample projects data (static for now)
        const sampleProjects = [
          {
            nome: "Projeto Escola Verde",
            endereco: "R. Ten. Agnaldo Lima, Paulista - PE",
            latlng: [-7.94, -34.88],
            status: "Ativo",
            mudas: "15/20"
          },
          {
            nome: "Microfloresta Comunitária",
            endereco: "Rua Ares 282, Paulista - PE",
            latlng: [-7.942, -34.879],
            status: "Em Crescimento",
            mudas: "8/12"
          },
          {
            nome: "Bosque Urbano",
            endereco: "Av. Pref. Geraldo Pinho Alves, Paulista - PE",
            latlng: [-7.945, -34.890],
            status: "Planejamento",
            mudas: "0/25"
          },
          {
            nome: "Jardim Sustentável",
            endereco: "R. Estr. de Jaguarana 155, Paulista - PE",
            latlng: [-7.948, -34.892],
            status: "Ativo",
            mudas: "30/30"
          },
          {
            nome: "Parque do Janga Verde",
            endereco: "R. Sessenta e Quatro, Parque do Janga, Paulista - PE",
            latlng: [-7.935, -34.870],
            status: "Em Crescimento",
            mudas: "18/22"
          },
          {
            nome: "Floresta Pau Amarelo",
            endereco: "Av. Dr. Cláudio José Gueiros Leite, Pau Amarelo, Paulista - PE",
            latlng: [-7.95621, -34.83066],
            status: "Concluído",
            mudas: "50/50"
          }
        ];

        // Add markers for each project
        sampleProjects.forEach(projeto => {
          window.L.marker(projeto.latlng, { icon: greenIcon })
            .addTo(map)
            .bindPopup(`
              <div style="text-align: center;">
                <strong style="color: #2E7D32;">${projeto.nome}</strong><br>
                <small>${projeto.endereco}</small><br>
                <div style="margin-top: 8px;">
                  <span style="background: #E8F5E8; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                    ${projeto.status}
                  </span><br>
                  <small style="color: #666;">Mudas: ${projeto.mudas}</small>
                </div>
              </div>
            `);
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Initialize map when component mounts
    initMap();

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [projects]);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ color: '#2E7D32', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Mapa Verde
      </h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Explore projetos de microflorestas ao redor do mundo
      </p>
      
      <div 
        ref={mapRef}
        id="mapa-verde-container"
        style={{ 
          height: '300px', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid #e0e0e0'
        }}
      />
    </div>
  );
};

export default InteractiveMap;
