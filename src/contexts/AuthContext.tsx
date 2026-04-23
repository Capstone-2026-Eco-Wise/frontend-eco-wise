import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type { AuthResponse } from "../features/auth/api/authApi";

interface AuthContextType {
  user: AuthResponse["user"] | null;
  role: string | null;
  token: string | null;
  loginState: (data: AuthResponse) => void;
  logoutState: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for initial auth load
    const storedToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedRole && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(storedToken);
      setRole(storedRole);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginState = (data: AuthResponse) => {
    setUser(data.user);
    setRole(data.role);
    setToken(data.token);

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logoutState = () => {
    setUser(null);
    setRole(null);
    setToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        loginState,
        logoutState,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
