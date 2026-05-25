import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const adminUsersService = {
  getUsers: async (params: { search?: string; role?: string; page: number; limit: number }) => {
    const res = await API.get(API_ENDPOINTS.ADMIN.GET_USERS, { params });
    return res.data.data;
  },

  createUser: async (data: Record<string, unknown>) => {
    const res = await API.post('auth/sign-up', data);
    return res.data.data;
  },

  updateRole: async (userId: string, role: string) => {
    const res = await API.patch(`users/${userId}/role`, { role });
    return res.data.data;
  },

  deleteUser: async (userId: string) => {
    const url = API_ENDPOINTS.ADMIN.DELETE_USER.replace(':id', userId);
    await API.delete(url);
  },
};
