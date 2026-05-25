import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface EcoPoints {
    totalPoints: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    status: 'active' | 'warning' | 'dead' | 'never';
    message: string;
}


export const getEcoPoints = async () => {
    const res = await API.get<{message: string; data: EcoPoints}>(
        API_ENDPOINTS.ECO_POINTS.GET_STREAK
    );
    return res.data.data;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  fullName: string;
  avatarUrl: string | null;
  totalPoints: number;
  rank: number;
}

export interface RawLeaderboardEntry {
  userId: string;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  user: {
    fullName: string;
    email: string;
    username: string;
    avatar_url?: string | null;
  };
}

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const res = await API.get<{ message: string; data: RawLeaderboardEntry[] }>(
    API_ENDPOINTS.ECO_POINTS.GET_LEADERBOARD
  );
  
  const rawList = res.data.data || [];
  
  return rawList.map((entry, index) => ({
    userId: entry.userId,
    username: entry.user?.username || "user",
    fullName: entry.user?.fullName || "Eco User",
    avatarUrl: entry.user?.avatar_url || null,
    totalPoints: entry.totalPoints,
    rank: index + 1,
  }));
};

