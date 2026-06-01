import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { type ScanResultResponse } from "./scanHistoryService";

export const userTaskCompletionsService = {
  completeTask: async (taskId: string, imageFile: File) => {
    const formData = new FormData();
    // Gunakan 'image' sesuai dengan req.file yang dibaca oleh backend UploadMiddleware
    formData.append('image', imageFile);
    
    const url = API_ENDPOINTS.USER_TASKS_COMPLETION.COMPLETE.replace(':taskId', taskId);
    const res = await API.post<{ message: string; data: ScanResultResponse & { completedTask: { isCompleted: boolean; pointAwarded: number } } }>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.data;
  },
  getUserTaskCompletions: async () => {
    const url = API_ENDPOINTS.USER_TASKS_COMPLETION.GET_ALL;
    const res = await API.get<{ message: string; data: UserTaskCompletionHistory[] }>(url);
    return res.data.data;
  }
};

export interface UserTaskCompletionHistory {
  id: string;
  userId: string;
  taskId: string;
  taskDate: string;
  pointAwarded: number;
  isCompleted: boolean;
  completedAt: string;
  task: {
    id: string;
    taskName: string;
    description: string;
    pointReward: number;
    category: {
      categoryCode: string;
      categoryName: string;
      colorHex: string;
    };
  };
}
