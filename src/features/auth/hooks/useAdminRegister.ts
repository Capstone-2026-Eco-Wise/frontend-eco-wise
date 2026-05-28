import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { registerAdmin } from '../api/authApi';
import type { AdminRegisterPayLoad } from '../types/auth';

export const useAdminRegister = ({
  fullName,
  username,
  email,
  password,
  adminSecret,
}: AdminRegisterPayLoad) => {
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { error, message } = await registerAdmin({
      fullName,
      username,
      email,
      password,
      adminSecret,
    });

    if (!error) {
      toast.success(message);
      navigate('/login', { replace: true });
    } else {
      const errorMessage =
        message || 'Registrasi admin gagal! Silakan periksa detail Anda.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { handleRegister };
};
