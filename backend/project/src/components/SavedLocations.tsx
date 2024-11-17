import React from 'react';
import { Home, Briefcase, MapPin } from 'lucide-react';
import { Location } from '../types';

interface SavedLocationsProps {
  locations: Location[];
  onSelect: (address: string) => void;
}

const SavedLocations: React.FC<SavedLocationsProps> = ({ locations, onSelect }) => {
  const getIcon = (type: Location['type']) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5 text-primary" />;
      case 'work':
        return <Briefcase className="w-5 h-5 text-primary" />;
      default:
        return <MapPin className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-gray-400 text-sm font-medium mb-3">Saved Locations</h3>
      {locations.map((location) => (
        <div
          key={location.id}
          onClick={() => onSelect(location.address)}
          className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg cursor-pointer hover:bg-dark-light transition-colors"
        >
          {getIcon(location.type)}
          <div>
            <p className="text-gray-200 font-medium">{location.name}</p>
            <p className="text-gray-400 text-sm">{location.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedLocations;