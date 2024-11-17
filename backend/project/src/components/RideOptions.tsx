import React, { useState } from 'react';
import { Car, Bike, Truck, Navigation2 } from 'lucide-react';
import { RideOption } from '../types';
import RideCard from './RideCard';

interface RideOptionsProps {
  rides: RideOption[];
}

const RideOptions: React.FC<RideOptionsProps> = ({ rides }) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const vehicleTypes = [
    { id: 'all', label: 'All', icon: Navigation2 },
    { id: 'Auto', label: 'Auto', icon: Car },
    { id: 'Bike', label: 'Bike', icon: Bike },
    { id: 'Mini', label: 'Mini', icon: Car },
    { id: 'XL', label: 'XL', icon: Truck },
  ];

  const filteredRides = selectedType === 'all' 
    ? rides 
    : rides.filter(ride => ride.type === selectedType);

  const sortedRides = filteredRides.sort((a, b) => a.price - b.price);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {vehicleTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedType(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedType === id
                ? 'bg-primary text-dark font-medium'
                : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedRides.map((ride, index) => (
          <RideCard key={`${ride.provider}-${ride.type}-${index}`} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default RideOptions;