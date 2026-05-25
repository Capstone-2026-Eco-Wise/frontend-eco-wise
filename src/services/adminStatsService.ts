import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  totalScans: number;
  totalPoints: number;
  totalFaqs: number;
  totalDailyTasks: number;
  totalWasteCategories: number;
}

export const adminStatsService = {
  getStats: async (): Promise<AdminStats> => {
    const res = await API.get<{ message: string; data: { stats: AdminStats } }>(
      API_ENDPOINTS.ADMIN.GET_DASHBOARD_STATS
    );
    // Respons backend dibungkus dalam { stats }
    return res.data.data?.stats || res.data.data as unknown as AdminStats;
  },
};
