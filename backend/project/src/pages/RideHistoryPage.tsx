import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RideHistoryPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-dark-light rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Ride History</h2>
            <Clock className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-4">
            {user?.recentRides.map((ride, index) => (
              <div key={index} className="bg-dark-lighter rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-gray-400 text-sm">{new Date(ride.date).toLocaleDateString()}</p>
                    <p className="text-primary font-semibold">{ride.provider}</p>
                  </div>
                  <p className="text-lg font-semibold">₹{ride.price}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <p className="text-gray-300">{ride.from}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <p className="text-gray-300">{ride.to}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideHistoryPage;