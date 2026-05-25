import axios from 'axios';
import { env } from './env';
import { getToken, clearToken } from './token';

const API = axios.create({
  baseURL: env.API_URL.endsWith('/') ? env.API_URL : `${env.API_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    apikey: env.API_KEY,
  },
});

// Request interceptor — inject token ke setiap request
API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor — tangani 401 secara terpusat (auto-logout)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken();
      // Dispatch event agar SessionContext reaktif membersihkan state
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  },
);

export default API;
