import { useSession } from '@/features/auth/hooks/useSession';
import { Navigate, Outlet } from 'react-router-dom';

type ROLES = 'user' | 'admin';

type ProtectedRouteProps = {
  allowedRoles?: ROLES[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { userData, isAuthenticated, isLoading } = useSession();
  let path;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.data?.role === 'admin') {
    path = '/admin';
  } else {
    path = '/dashboard';
  }

  if (allowedRoles && !allowedRoles.includes(userData?.data.role as ROLES)) {
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}
