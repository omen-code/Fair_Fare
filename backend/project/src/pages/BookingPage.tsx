import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Phone, MessageSquare, Star } from 'lucide-react';

interface DriverDetails {
  name: string;
  rating: string;
  phone: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleColor: string;
  eta: number;
}

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const ride = location.state?.ride;

  useEffect(() => {
    if (!ride) {
      navigate('/');
      return;
    }

    const timeout = setTimeout(() => {
      const randomDriver = {
        name: ['Rahul Kumar', 'Amit Singh', 'Priya Sharma', 'Raj Patel'][
          Math.floor(Math.random() * 4)
        ],
        rating: (4 + Math.random()).toFixed(1),
        phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        vehicleNumber: `KA ${Math.floor(Math.random() * 99)} ${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )}${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )} ${Math.floor(Math.random() * 9999)}`.toUpperCase(),
        vehicleModel: ['Swift Dzire', 'Honda City', 'Hyundai Venue', 'Toyota Innova'][
          Math.floor(Math.random() * 4)
        ],
        vehicleColor: ['White', 'Silver', 'Black', 'Grey'][
          Math.floor(Math.random() * 4)
        ],
        eta: Math.floor(Math.random() * 5) + 1,
      };

      setDriverDetails(randomDriver);
      setIsLoading(false);
    }, 2000 + Math.random() * 2000);

    return () => clearTimeout(timeout);
  }, [ride, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-primary mb-2">Finding your ride</h2>
        <p className="text-gray-400">Please wait while we connect you with a driver</p>
      </div>
    );
  }

  if (!driverDetails) return null;

  return (
    <div className="min-h-screen bg-dark p-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Ride Found!</h2>
          <p className="text-green-500">Your driver is on the way</p>
        </div>

        <div className="bg-dark-light rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {driverDetails.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-200">
                {driverDetails.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400">
                <Star className="w-4 h-4 text-primary" />
                <span>{driverDetails.rating}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Vehicle</span>
              <span className="text-gray-200">{driverDetails.vehicleModel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Color</span>
              <span className="text-gray-200">{driverDetails.vehicleColor}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Number</span>
              <span className="text-gray-200">{driverDetails.vehicleNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">ETA</span>
              <span className="text-gray-200">{driverDetails.eta} mins</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-primary hover:bg-primary-dark text-dark font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call
            </button>
            <button className="flex-1 bg-dark-lighter hover:bg-dark text-gray-200 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-700">
              <MessageSquare className="w-5 h-5" />
              Message
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-dark-lighter text-gray-200 py-3 rounded-lg hover:bg-dark transition-colors border border-gray-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingPage;