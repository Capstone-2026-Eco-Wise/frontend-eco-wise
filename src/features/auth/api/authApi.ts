import axios from 'axios';
import API from '@/lib/axios';
import { saveToken } from '@/lib/token';
import type {
  AuthResponse,
  LoginPayLoad,
  RegisterPayLoad,
  LoginResponseType,
  ReturnAuthType,
} from '../types/auth';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { sessionUser } from './session';

export const login = async (
  loginPayload: LoginPayLoad,
): Promise<ReturnAuthType> => {
  try {
    const { data } = await API.post<LoginResponseType>(
      API_ENDPOINTS.AUTH.SIGN_IN,
      loginPayload,
    );

    saveToken(data.data.access_token);

    const sessionUserData = await sessionUser(data.data.access_token);

    if (!data || !data.data) {
      return {
        error: true,
        data: sessionUserData,
        message: data.message,
      };
    }

    return {
      error: false,
      data: sessionUserData,
      message: data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: true,
        data: error.response?.data,
        message: error.response?.data.message,
      };
    }
  }

  return {
    error: true,
    data: null,
    message: 'Terjadi kesalahan',
  };
};

export const register = async (data: RegisterPayLoad) => {
  try {
    const res = await API.post<{ message: string; data: AuthResponse }>(
      API_ENDPOINTS.AUTH.SIGN_UP,
      data,
    );

    return {
      error: false,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        error: true,
        data: err.response?.data,
        message: err.response?.data?.message || 'Registrasi gagal! Silakan periksa detail Anda.',
      };
    }
  }
  return {
    error: true,
    data: null,
    message: 'Terjadi kesalahan',
  };
};
