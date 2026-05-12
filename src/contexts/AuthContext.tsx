import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthResponse } from "../features/auth/types/auth";

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
  const [user, setUser] = useState<AuthResponse["user"] | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState<string | null>(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole && storedRole !== "undefined" ? storedRole : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("accessToken");
    return storedToken && storedToken !== "undefined" ? storedToken : null;
  });

  const loginState = (data: AuthResponse) => {
    setUser(data.user);
    setRole(data.user.role);
    setToken(data.access_token);

    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("role", data.user.role);
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
