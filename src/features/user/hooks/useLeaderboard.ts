import { useState, useEffect } from "react";
import { getLeaderboard, type LeaderboardEntry } from "@/services/ecoPointsService";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        setError(error.response?.data?.message || error.message || "Gagal memuat papan peringkat");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [refreshTrigger]);

  return { leaderboard, loading, error, refetch };
};
