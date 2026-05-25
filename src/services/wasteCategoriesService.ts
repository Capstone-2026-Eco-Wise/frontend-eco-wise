import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export interface WasteCategory {
  id: string;
  categoryCode: string;
  categoryName: string;
  description: string | null;
  handlingTips: string | null;
  colorHex: string | null;
  pointsReward: number;
}

export interface WasteCategoryDTO {
  categoryCode: string;
  categoryName: string;
  description: string | null;
  handlingTips: string | null;
  colorHex: string | null;
  pointsReward: number;
}

export const wasteCategoriesService = {
  getAll: async (): Promise<WasteCategory[]> => {
    const res = await API.get(API_ENDPOINTS.WASTE_CATEGORIES.GET_ALL);
    return res.data.data || [];
  },

  create: async (data: WasteCategoryDTO): Promise<WasteCategory> => {
    const res = await API.post(API_ENDPOINTS.WASTE_CATEGORIES.CREATE, data);
    return res.data.data;
  },

  update: async (id: string, data: WasteCategoryDTO): Promise<WasteCategory> => {
    const res = await API.patch(API_ENDPOINTS.WASTE_CATEGORIES.UPDATE.replace(':id', id), data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await API.delete(API_ENDPOINTS.WASTE_CATEGORIES.DELETE.replace(':id', id));
  },
};
