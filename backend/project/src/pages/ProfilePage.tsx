import React from 'react';
import { User as UserIcon, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-dark-light rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Profile</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-dark-lighter rounded-lg">
              <UserIcon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-gray-200">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-dark-lighter rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-gray-200">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-light rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-primary mb-4">Saved Locations</h3>
          <div className="space-y-3">
            {user.savedLocations.map((location) => (
              <div key={location.id} className="flex items-center gap-3 p-4 bg-dark-lighter rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-gray-200">{location.name}</p>
                  <p className="text-sm text-gray-400">{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;