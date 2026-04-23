import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to={role === "admin" ? "/admin" : "/"} />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <RegisterPage />
          ) : (
            <Navigate to={role === "admin" ? "/admin" : "/"} />
          )
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          isAuthenticated && role === "admin" ? (
            <div className="p-4 text-2xl font-bold bg-slate-900 text-white min-h-screen">
              Admin Dashboard
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Protected User Routes */}
      <Route
        path="/"
        element={
          isAuthenticated && role === "user" ? (
            <div className="p-4 text-2xl font-bold">User Home Dashboard</div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
