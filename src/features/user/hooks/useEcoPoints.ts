import { useState, useEffect } from "react";
import { getEcoPoints,type EcoPoints } from "@/services/ecoPointsService";

export interface ProcessedStreak {
  streakCount: number;
  flameColor: string;
  isAnimated: boolean;
  isLit: boolean;
}

const getFrontendStreak = (pointsData: EcoPoints | null): ProcessedStreak => {
  if (!pointsData) {
    return { streakCount: 0, flameColor: 'text-slate-300', isAnimated: false, isLit: false };
  }

  const { status, currentStreak } = pointsData;

  if (status === 'dead' || status === 'never') {
    return {
      streakCount: 0,
      flameColor: 'text-slate-300 dark:text-slate-600',
      isAnimated: false,
      isLit: false,
    };
  }

  if (status === 'warning') {
    return {
      streakCount: currentStreak,
      flameColor: 'text-amber-500 animate-pulse',
      isAnimated: true,
      isLit: true,
    };
  }

  return {
    streakCount: currentStreak,
    flameColor: 'text-orange-500 drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)]',
    isAnimated: true,
    isLit: true,
  };
};

export const useEcoPoints = () => {
  const [pointsData, setPointsData] = useState<EcoPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        setLoading(true);
        const data = await getEcoPoints();
        setPointsData(data);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        setError(error.response?.data?.message || error.message || "Gagal memuat data poin");
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [refreshTrigger]);

  const streak = getFrontendStreak(pointsData);

  return { pointsData, loading, error, streak, refetch };
};
