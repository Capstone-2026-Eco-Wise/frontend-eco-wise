import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import getRedirectPath from "../features/auth/utils/roleRedirect";

export default function PublicRoute() {
  const { isAuthenticated, role } = useAuth();

  // If the user is already authenticated, redirect them away from public auth pages
  if (isAuthenticated) {
    const redirectPath = getRedirectPath(role || "user");
    return <Navigate to={redirectPath} replace />;
  }

  // If not authenticated, allow them to view the public page (Login/Register)
  return <Outlet />;
}
