import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking stored auth
    const storedUser = localStorage.getItem('fairfare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      name: 'John Doe',
      email,
      savedLocations: [
        {
          id: '1',
          name: 'Home',
          address: '123 Main St, Bangalore',
          type: 'home'
        },
        {
          id: '2',
          name: 'Work',
          address: 'Tech Park, Whitefield',
          type: 'work'
        }
      ],
      recentRides: [
        {
          date: '2024-03-10',
          from: 'Home',
          to: 'Work',
          provider: 'Uber',
          price: 250
        }
      ]
    };
    
    setUser(mockUser);
    localStorage.setItem('fairfare_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fairfare_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};