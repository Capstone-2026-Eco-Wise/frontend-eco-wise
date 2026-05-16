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