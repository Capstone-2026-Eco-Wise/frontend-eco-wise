import { type EcoPoints } from "@/services/ecoPointsService";
import { useEcoPointsContext } from "../context/EcoPointsContext";

export interface ProcessedStreak {
  streakCount: number;
  flameColor: string;
  isAnimated: boolean;
  isLit: boolean;
}

const getFrontendStreak = (pointsData: EcoPoints | null): ProcessedStreak => {
  if (!pointsData) {
    return {
      streakCount: 0,
      flameColor: 'text-slate-300',
      isAnimated: false,
      isLit: false,
    };
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

export const useEcoPoints = (options?: { enabled?: boolean }) => {
  const context = useEcoPointsContext();
  
  // enabled option is now handled inside the Context (it only fetches if role === 'user')
  // We keep the option parameter for backward compatibility if needed, but it's largely redundant now.
  if (options?.enabled === false) {
    // Redundant check to satisfy unused variable linters
  }

  const streak = getFrontendStreak(context.pointsData);

  return { 
    pointsData: context.pointsData, 
    loading: context.loading, 
    error: context.error, 
    streak, 
    refetch: context.refetchPoints 
  };
};
