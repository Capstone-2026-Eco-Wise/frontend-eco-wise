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

export interface DailyTaskDTO {
  taskName: string;
  description: string;
  pointReward: number;
  isActive: boolean;
  activeDate: string;
  categoryId?: string | null;
  
}


export const getDailyTasks = async () => {
  const res = await API.get(API_ENDPOINTS.DAILY_TASKS.GET_ALL);
  return res.data.data?.data || res.data.data || [];
};

export const dailyTasksService = {
  getAll: getDailyTasks,

  getAdminDailyTasks: async (): Promise<DailyTask[]> => {
    const res = await API.get(API_ENDPOINTS.ADMIN.GET_DAILY_TASKS);
    return res.data.data?.data || res.data.data || [];
  },

  create: async (data: DailyTaskDTO): Promise<DailyTask> => {
    const res = await API.post<{message: string; data:DailyTask}>(API_ENDPOINTS.DAILY_TASKS.CREATE, data);
    return res.data.data;
  },

  update: async (id: string, data: DailyTaskDTO): Promise<DailyTask> => {
    const res = await API.put<{message: string; data:DailyTask}>(API_ENDPOINTS.DAILY_TASKS.UPDATE.replace(":id", id), data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const url = API_ENDPOINTS.DAILY_TASKS.DELETE.replace(":id", id);
    await API.delete(url);
  },
}
