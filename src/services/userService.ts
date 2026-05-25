import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const updateAvatar = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('avatar', imageFile);

  const res = await API.patch<{ message: string; data: unknown }>(
    API_ENDPOINTS.USERS.UPDATE_AVATAR,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data.data;
};

export const getProfile = async () => {
  const res = await API.get<{ message: string; data: unknown }>(
    API_ENDPOINTS.AUTH.ME
  );
  return res.data.data;
};

export const updateProfile = async (fullName: string) => {
  const res = await API.patch<{ message: string; data: unknown }>(
    API_ENDPOINTS.USERS.UPDATE_PROFILE,
    { fullName }
  );
  return res.data.data;
};

export const updatePassword = async (payload: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
  const res = await API.put<{ message: string; data: unknown }>(
    API_ENDPOINTS.AUTH.UPDATE_PASSWORD,
    payload
  );
  return res.data.data;
};
