import API from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface EcoPoints {
    totalPoints: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    status: 'active' | 'warning' | 'dead' | 'never';
    message: string;
}


export const getEcoPoints = async () => {
    const res = await API.get<{message: string; data: EcoPoints}>(
        API_ENDPOINTS.ECO_POINTS.GET_STREAK
    );
    return res.data.data;
}

