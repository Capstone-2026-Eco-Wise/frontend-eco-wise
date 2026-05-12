import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = "/",
}: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // If they are logged in but don't have the right role, 
    // kick them to their appropriate dashboard or home.
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
}
