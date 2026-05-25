import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import API from '@/lib/axios';
import { saveToken } from '@/lib/token';
import type { LoginPayLoad } from '../types/auth';

export const login = async (payload: LoginPayLoad) => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.SIGN_IN, payload);

  saveToken(data.data.access_token);

  return {
    error: false,
    data: data.data,
  };
};
