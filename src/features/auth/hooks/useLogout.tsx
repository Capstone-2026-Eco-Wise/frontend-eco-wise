import { logout } from '../api/logout';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', {
      replace: true,
    });
  };
  return { handleLogout };
};
