import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-dark-light py-4 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Menu 
              className="w-6 h-6 text-primary cursor-pointer hover:text-primary-dark transition-colors" 
              onClick={() => setIsSidebarOpen(true)}
            />
            <h1 
              onClick={() => navigate('/')}
              className="text-primary text-2xl font-bold cursor-pointer"
            >
              FairFare
            </h1>
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default Navbar;