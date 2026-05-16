import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import API from '@/lib/axios';
import type { ResponseSessionUser } from '../types/auth';

export const sessionUser = async (session: string) => {
  const { data: SessionUserData } = await API.get<ResponseSessionUser>(
    API_ENDPOINTS.AUTH.ME,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    },
  );

  return SessionUserData;
};
