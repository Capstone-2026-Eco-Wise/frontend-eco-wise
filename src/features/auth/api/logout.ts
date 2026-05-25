import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import API from '@/lib/axios';
import { getToken, clearToken } from '@/lib/token';

export const logout = async () => {
  const accessToken = getToken();

  const { data } = await API.delete(API_ENDPOINTS.AUTH.SIGN_OUT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  clearToken();

  return {
    error: false,
    data: data.data,
  };
};
