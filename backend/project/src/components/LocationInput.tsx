import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simulated location suggestions for demo
  const suggestions = [
    {
      description: 'Indiranagar, Bangalore',
      coordinates: { lat: 12.9784, lng: 77.6408 }
    },
    {
      description: 'Koramangala, Bangalore',
      coordinates: { lat: 12.9279, lng: 77.6271 }
    },
    {
      description: 'HSR Layout, Bangalore',
      coordinates: { lat: 12.9081, lng: 77.6476 }
    },
    {
      description: 'Whitefield, Bangalore',
      coordinates: { lat: 12.9698, lng: 77.7500 }
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectLocation = (description: string, coordinates: { lat: number; lng: number }) => {
    onChange(description, coordinates);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-dark-lighter text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-500"
        />
      </div>

      {showSuggestions && value && (
        <ul className="absolute z-10 w-full mt-1 bg-dark-lighter border border-gray-700 rounded-lg shadow-lg">
          {suggestions
            .filter(suggestion => 
              suggestion.description.toLowerCase().includes(value.toLowerCase())
            )
            .map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectLocation(suggestion.description, suggestion.coordinates)}
                className="px-4 py-2 hover:bg-dark-light cursor-pointer text-gray-200 border-b border-gray-700 last:border-none"
              >
                {suggestion.description}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;