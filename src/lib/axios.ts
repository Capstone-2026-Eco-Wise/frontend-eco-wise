import axios from 'axios';
import { env } from './env';

const API = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    apikey: env.API_KEY,
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
