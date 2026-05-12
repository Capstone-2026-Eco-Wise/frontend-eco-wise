import axios from 'axios';
import API from '@/lib/axios';
import type {
  AuthResponse,
  LoginPayLoad,
  RegisterPayLoad,
} from '../types/auth';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const login = async (data: LoginPayLoad) => {
  try {
    const res = await API.post<{ message: string; data: AuthResponse }>(API_ENDPOINTS.AUTH.SIGN_IN, data);

    return {
      error: false,
      data: res.data.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        error: true,
        data: err.response?.data,
      };
    }
  }
  return {
    error: true,
    data: null,
  };
};

export const register = async (data: RegisterPayLoad) => {
  try {
    const res = await API.post<{ message: string; data: AuthResponse }>(API_ENDPOINTS.AUTH.SIGN_UP, data);

    return {
      error: false,
      data: res.data.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        error: true,
        data: err.response?.data,
      };
    }
  }
  return {
    error: true,
    data: null,
  };
};
