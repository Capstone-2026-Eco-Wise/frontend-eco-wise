import { useEffect, useState, useCallback } from 'react';
import { sessionUser } from '../api/session';
import type { ResponseSessionUser } from '../types/auth';
import { toast } from 'sonner';

export const useSession = () => {
  const [userData, setUserData] = useState<ResponseSessionUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = localStorage.getItem('accessToken');

  const fetchUser = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const SessionUserData = await sessionUser(token);
      if (SessionUserData?.data) {
        setUserData(SessionUserData);
      } else {
        setUserData(null);
        localStorage.removeItem('accessToken');
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengambil sesi pengguna. Silakan masuk kembali.');
      setUserData(null);
      localStorage.removeItem('accessToken');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const isAuthenticated = !!userData?.data && !!token;

  return {
    userData,
    isAuthenticated,
    isLoading,
    refetchUser: fetchUser,
  };
};
