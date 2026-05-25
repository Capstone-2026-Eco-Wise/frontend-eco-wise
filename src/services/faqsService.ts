import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    orderNumber: number;
    isActive: boolean;
    createdBy: string | null;
    updatedBy: string | null;
}

export const getPublicFaQs = async(category?: string) => {
    const res = await API.get<{ message: string; data: FAQ[] }>(
        API_ENDPOINTS.FAQS.GET_PUBLIC,
        {
            params: category ? { category } : undefined,
        }
    );
    return res.data.data;
}

export interface FAQDTO {
  question: string;
  answer: string;
  category: string;
  orderNumber: number;
  isActive: boolean;
}

export const faqsService = {
  getPublic: getPublicFaQs,

  getAdminFAQs: async (): Promise<FAQ[]> => {
    const res = await API.get<{ message: string; data: FAQ[] }>(
      API_ENDPOINTS.ADMIN.GET_FAQS
    );
    return res.data.data || [];
  },

  create: async (data: FAQDTO): Promise<FAQ> => {
    const res = await API.post<{ message: string; data: FAQ }>(
      API_ENDPOINTS.FAQS.CREATE,
      data
    );
    return res.data.data;
  },

  update: async (id: string, data: FAQDTO): Promise<FAQ> => {
    const url = API_ENDPOINTS.FAQS.UPDATE.replace(':id', id);
    const res = await API.put<{ message: string; data: FAQ }>(url, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const url = API_ENDPOINTS.FAQS.DELETE.replace(':id', id);
    await API.delete(url);
  },
};