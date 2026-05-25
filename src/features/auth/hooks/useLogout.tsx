import { logout } from '../api/logout';
import { useNavigate } from 'react-router-dom';
import { useSession } from './useSession';

export const useLogout = () => {
  const navigate = useNavigate();
  const { refetchUser } = useSession();

  const handleLogout = async () => {
    await logout();
    await refetchUser();
    navigate('/login', {
      replace: true,
    });
  };
  return { handleLogout };
};
