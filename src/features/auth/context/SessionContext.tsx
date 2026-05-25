/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { sessionUser } from "../api/session";
import type { ResponseSessionUser } from "../types/auth";
import { toast } from "sonner";
import { getToken, clearToken } from "@/lib/token";

type SessionContextType = {
  userData: ResponseSessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<ResponseSessionUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchUser = useCallback(async () => {
    const currentToken = getToken();
    if (!currentToken) {
      setIsLoading(false);
      setUserData(null);
      return;
    }

    try {
      setIsLoading(true);
      const SessionUserData = await sessionUser(currentToken);
      if (SessionUserData?.data) {
        setUserData(SessionUserData);
      } else {
        setUserData(null);
        clearToken();
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengambil sesi pengguna. Silakan masuk kembali.");
      setUserData(null);
      clearToken();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const handleGlobalUpdate = () => {
      fetchUser();
    };
    window.addEventListener("user-session-updated", handleGlobalUpdate);
    return () => {
      window.removeEventListener("user-session-updated", handleGlobalUpdate);
    };
  }, [fetchUser]);

  const refetchUser = useCallback(async () => {
    await fetchUser();
    window.dispatchEvent(new Event("user-session-updated"));
  }, [fetchUser]);

  // Listen ke event dari axios response interceptor (401 → auto-logout)
  useEffect(() => {
    const handleUnauthorized = () => {
      setUserData(null);
      toast.error("Sesi Anda telah berakhir. Silakan masuk kembali.");
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const isAuthenticated =
    !!userData?.data && !!getToken();

  return (
    <SessionContext.Provider
      value={{ userData, isAuthenticated, isLoading, refetchUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
