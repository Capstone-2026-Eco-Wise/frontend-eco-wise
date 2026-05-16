import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface DailyTask {
  id: string;
  taskName: string;
  description: string;
  pointReward: number;
  isActive: boolean;
  activeDate: string;
  categoryId?: string | null;
  category?: {
    id: string;
    categoryName: string;
    categoryCode: string;
  } | null;
}

export const getDailyTasks = async () => {
  const res = await API.get(API_ENDPOINTS.DAILY_TASKS.GET_ALL);
  return res.data.data?.data || res.data.data || [];
};
