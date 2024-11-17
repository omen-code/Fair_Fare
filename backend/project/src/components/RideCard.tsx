import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Bike, Truck, Clock, IndianRupee, Users } from 'lucide-react';
import { RideOption } from '../types';

interface RideCardProps {
  ride: RideOption;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (ride.available) {
      navigate('/booking', { state: { ride } });
    }
  };

  const getIcon = () => {
    switch (ride.type) {
      case 'Bike':
        return <Bike className="w-6 h-6 text-primary" />;
      case 'XL':
        return <Truck className="w-6 h-6 text-primary" />;
      default:
        return <Car className="w-6 h-6 text-primary" />;
    }
  };

  const getProviderColor = () => {
    switch (ride.provider.toLowerCase()) {
      case 'uber':
        return 'text-[#276EF1]';
      case 'ola':
        return 'text-[#7AB778]';
      case 'rapido':
        return 'text-[#FFCA28]';
      default:
        return 'text-primary';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-dark-light rounded-xl p-4 shadow-lg transition-all border border-gray-800 ${
        ride.available
          ? 'hover:shadow-xl hover:border-primary/50 cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <span className={`font-semibold text-lg ${getProviderColor()}`}>
              {ride.provider}
            </span>
            <p className="text-sm text-gray-400">{ride.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span>{ride.capacity}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <IndianRupee className="w-4 h-4 text-primary" />
          <span className="font-bold text-lg text-gray-200">₹{ride.price}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{ride.eta} mins</span>
          </div>
          {!ride.available && (
            <span className="text-sm text-red-500">Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideCard;