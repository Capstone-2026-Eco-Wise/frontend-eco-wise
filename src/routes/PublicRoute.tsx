import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/features/auth/hooks/useSession";
import getRedirectPath from "../features/auth/utils/roleRedirect";

export default function PublicRoute() {
  const { isAuthenticated, userData, isLoading } = useSession();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">Loading...</div>;
  }

  // If the user is already authenticated, redirect them away from public auth pages
  if (isAuthenticated && userData?.data?.role) {
    const redirectPath = getRedirectPath(userData.data.role);
    return <Navigate to={redirectPath} replace />;
  }

  // If not authenticated, allow them to view the public page (Login/Register)
  return <Outlet />;
}
