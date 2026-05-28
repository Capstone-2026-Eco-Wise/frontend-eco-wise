/* eslint-disable react-refresh/only-export-components */
import { useSession } from '@/features/auth/hooks/useSession';
import { getEcoPoints, type EcoPoints } from '@/services/ecoPointsService';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type EcoPointsContextType = {
  pointsData: EcoPoints | null;
  loading: boolean;
  error: string | null;
  refetchPoints: () => Promise<void>;
};

const EcoPointsContext = createContext<EcoPointsContextType | undefined>(
  undefined,
);

export const EcoPointsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userData, isAuthenticated } = useSession();
  const [pointsData, setPointsData] = useState<EcoPoints | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoints = useCallback(async () => {
    // Hanya fetch jika user login dan role-nya adalah 'user'
    if (!isAuthenticated || userData?.data?.role !== 'user') {
      setLoading(false);
      setPointsData(null);
      return;
    }

    try {
      setLoading(true);
      const data = await getEcoPoints();
      setPointsData(data);
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.message ||
          error.message ||
          'Gagal memuat data poin',
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, userData?.data?.role]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return (
    <EcoPointsContext.Provider
      value={{ pointsData, loading, error, refetchPoints: fetchPoints }}
    >
      {children}
    </EcoPointsContext.Provider>
  );
};

export const useEcoPointsContext = () => {
  const context = useContext(EcoPointsContext);
  if (context === undefined) {
    throw new Error(
      'useEcoPointsContext must be used within an EcoPointsProvider',
    );
  }
  return context;
};
