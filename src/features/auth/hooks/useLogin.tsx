import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import type { LoginPayLoad, ResponseSessionUser } from '../types/auth';
import getRedirectPath from '../utils/roleRedirect';
import { toast } from 'sonner';
import { useSession } from './useSession';

export const useLogin = ({ email, password }: LoginPayLoad) => {
  const navigate = useNavigate();
  const { refetchUser } = useSession();

  const handleLogin = async () => {
    const { error, data, message } = await login({ email, password });

    if (!error && data) {
      await refetchUser();
      const path = (data as ResponseSessionUser).data.role
        ? getRedirectPath((data as ResponseSessionUser).data.role)
        : '/';
      navigate(path);
      toast.success(message);
    } else {
      toast.error(
        message || 'Terlalu banyak permintaan, coba lagi dalam beberapa menit',
      );
    }
  };

  return { handleLogin };
};
