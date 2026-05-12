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

export const getScanHistory = async () => {
  const res = await API.get<{ message: string; data: ScanHistory[] }>(
    API_ENDPOINTS.SCAN_HISTORY.GET_ALL
  );
  return res.data.data;
};

export const createScanHistory = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await API.post<{ message: string; data: ScanHistory }>(
    API_ENDPOINTS.SCAN_HISTORY.CREATE,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data.data;
};
