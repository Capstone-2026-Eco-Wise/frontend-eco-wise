import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface ScanHistory {
  id: string;
  userId: string;
  categoryId: string;
  imageUrl: string;
  confidenceScore: number;
  pointEarned: number;
  scannedAt: string;
}

export interface ScanResultResponse {
  aiResult: {
    persen: string;
    labelAi: string;
    tips: string;
    latency: number;
  };
  category: {
    categoryCode?: string;
    category?: string;
    points?: number;
    handlingTips?: string;
  };
  scanHistory: ScanHistory;
  tokenUserRemaining?: {
    id: string;
    username: string;
    aiToken: number;
  };
  completedTask?: {
    isCompleted: boolean;
    pointAwarded: number;
  };
}

export const getScanHistory = async () => {
  const res = await API.get<{ message: string; data: ScanHistory[] }>(
    API_ENDPOINTS.SCAN_HISTORY.GET_ALL,
  );
  return res.data.data;
};

export interface ScanHistoryDetail extends ScanHistory {
  category: {
    categoryCode: string;
    categoryName: string;
    description: string;
    colorHex: string;
    handlingTips: string;
    pointsReward: number;
  };
}

export const getScanHistoryById = async (id: string) => {
  const res = await API.get<{ message: string; data: ScanHistoryDetail }>(
    API_ENDPOINTS.SCAN_HISTORY.GET_BY_ID.replace(':id', id),
  );
  return res.data.data;
};

export const createScanHistory = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await API.post<{ message: string; data: ScanResultResponse }>(
    API_ENDPOINTS.SCAN_HISTORY.CREATE,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data.data;
};
