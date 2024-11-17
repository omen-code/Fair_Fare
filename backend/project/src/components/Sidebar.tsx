import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Wallet,
  Settings,
  Clock,
  User,
  MapPin,
  Heart,
  HelpCircle,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
    { icon: <Wallet size={20} />, label: 'Wallet', path: '/wallet' },
    { icon: <Clock size={20} />, label: 'Ride History', path: '/history' },
    { icon: <MapPin size={20} />, label: 'Saved Places', path: '/places' },
    { icon: <Heart size={20} />, label: 'Favorites', path: '/favorites' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', path: '/support' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-dark-light z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-dark-lighter rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {user && (
            <div className="mb-6 p-4 bg-dark-lighter rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-200 font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-dark-lighter rounded-lg transition-colors"
              >
                <span className="text-primary">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;