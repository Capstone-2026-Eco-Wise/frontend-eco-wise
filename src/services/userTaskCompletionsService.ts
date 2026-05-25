import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const userTaskCompletionsService = {
  completeTask: async (taskId: string, imageFile: File) => {
    const formData = new FormData();
    // Gunakan 'image' sesuai dengan req.file yang dibaca oleh backend UploadMiddleware
    formData.append('image', imageFile);
    
    const url = API_ENDPOINTS.USER_TASKS_COMPLETION.COMPLETE.replace(':taskId', taskId);
    const res = await API.post<{ message: string; data: unknown }>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.data;
  },
};
