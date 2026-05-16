import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import API from '@/lib/axios';

export const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.delete(API_ENDPOINTS.AUTH.SIGN_OUT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  localStorage.removeItem('accessToken');

  return {
    error: false,
    data: data.data,
  };
};
