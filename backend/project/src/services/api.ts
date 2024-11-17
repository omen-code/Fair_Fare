import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password })
};

export const user = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  addLocation: (location: any) => api.post('/users/locations', location),
  getWallet: () => api.get('/users/wallet'),
  addToWallet: (amount: number) => api.post('/users/wallet/add', { amount })
};

export const rides = {
  getHistory: () => api.get('/rides/history'),
  addRide: (ride: any) => api.post('/rides', ride)
};

export default api;