import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { register } from '../api/authApi';
import type { RegisterPayLoad } from '../types/auth';

export const useRegister = ({
  fullName,
  username,
  email,
  password,
}: RegisterPayLoad) => {
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { error, data } = await register({
      fullName,
      username,
      email,
      password,
    });

    if (!error) {
      toast.success(data?.message);
      navigate('/dashboard', { replace: true });
    } else {
      const errorMessage =
        data?.message || 'Registrasi gagal! Silakan periksa detail Anda.';
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throwing so the form can catch it if needed (or we can just let it finish)
    }
  };

  return { handleRegister };
};
