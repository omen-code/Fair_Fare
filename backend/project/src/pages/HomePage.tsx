import React, { useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import LocationInput from '../components/LocationInput';
import RideOptions from '../components/RideOptions';
import SavedLocations from '../components/SavedLocations';
import { RideOption } from '../types';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSourceChange = useCallback((value: string) => {
    setSource(value);
  }, []);

  const handleDestChange = useCallback((value: string) => {
    setDestination(value);
  }, []);

  const handleSearch = () => {
    if (source && destination) {
      setShowResults(true);
    }
  };

  const generateRandomRides = (): RideOption[] => {
    const basePrice = 100 + Math.random() * 200;
    const baseEta = 5 + Math.floor(Math.random() * 10);

    return [
      // Uber options
      {
        provider: 'Uber',
        price: Math.round(basePrice * 0.8),
        eta: baseEta,
        type: 'Auto',
        capacity: 3,
        available: Math.random() > 0.2,
      },
      {
        provider: 'Uber',
        price: Math.round(basePrice),
        eta: baseEta - 2,
        type: 'Mini',
        capacity: 4,
        available: Math.random() > 0.1,
      },
      {
        provider: 'Uber',
        price: Math.round(basePrice * 1.5),
        eta: baseEta + 1,
        type: 'XL',
        capacity: 6,
        available: Math.random() > 0.3,
      },
      // Ola options
      {
        provider: 'Ola',
        price: Math.round(basePrice * 0.75),
        eta: baseEta + 1,
        type: 'Auto',
        capacity: 3,
        available: Math.random() > 0.2,
      },
      {
        provider: 'Ola',
        price: Math.round(basePrice * 0.95),
        eta: baseEta,
        type: 'Mini',
        capacity: 4,
        available: Math.random() > 0.1,
      },
      {
        provider: 'Ola',
        price: Math.round(basePrice * 1.4),
        eta: baseEta + 2,
        type: 'XL',
        capacity: 6,
        available: Math.random() > 0.3,
      },
      // Rapido options
      {
        provider: 'Rapido',
        price: Math.round(basePrice * 0.5),
        eta: baseEta - 3,
        type: 'Bike',
        capacity: 1,
        available: Math.random() > 0.1,
      },
      {
        provider: 'Rapido',
        price: Math.round(basePrice * 0.7),
        eta: baseEta - 1,
        type: 'Auto',
        capacity: 3,
        available: Math.random() > 0.2,
      },
    ];
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-8 pt-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Compare & Save</h1>
          <p className="text-gray-400">Find the best rides at the best prices</p>
        </div>

        {user && (
          <div className="mb-6">
            <SavedLocations
              locations={user.savedLocations}
              onSelect={setSource}
            />
          </div>
        )}

        <div className="bg-dark-light rounded-xl p-6 shadow-lg mb-6">
          <div className="space-y-4">
            <LocationInput
              label="Pickup Location"
              value={source}
              onChange={handleSourceChange}
              placeholder="Enter pickup location"
            />
            
            <div className="relative">
              <div className="absolute left-5 inset-y-0 flex items-center">
                <ArrowDown className="w-4 h-4 text-primary" />
              </div>
            </div>

            <LocationInput
              label="Drop Location"
              value={destination}
              onChange={handleDestChange}
              placeholder="Enter drop location"
            />

            <button
              onClick={handleSearch}
              disabled={!source || !destination}
              className={`w-full py-3 rounded-lg text-dark font-medium transition-all ${
                source && destination
                  ? 'bg-primary hover:bg-primary-dark'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Compare Rides
            </button>
          </div>
        </div>

        {showResults && (
          <RideOptions rides={generateRandomRides()} />
        )}
      </div>
    </div>
  );
};

export default HomePage;