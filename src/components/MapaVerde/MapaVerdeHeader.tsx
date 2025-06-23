
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CarouselHeader from '@/components/ui/carousel-header';

interface MapaVerdeHeaderProps {
  onBack: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MapaVerdeHeader = ({ onBack, searchTerm, onSearchChange }: MapaVerdeHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-puff-green">Mapa Verde</h1>
            <p className="text-gray-600">Explore projetos de microflorestas ao redor do mundo</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <CarouselHeader />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>
    </div>
  );
};

export default MapaVerdeHeader;
