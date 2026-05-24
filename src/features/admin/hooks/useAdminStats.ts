import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export default function useAdminStats() {
    const [stats, setStats] = useState({
        totalFaqs: 0,
        totalActiveTasks: 0,
        totalScans: 0,
        ecoPoints: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [faqs, tasks, scans, points] = await Promise.all([
                    API.get(API_ENDPOINTS.ADMIN.GET_FAQS).catch(() => ({ data: { data: [] } })),
                    API.get(API_ENDPOINTS.ADMIN.GET_DAILY_TASKS).catch(() => ({ data: { data: { data: [] } } })),
                    API.get(API_ENDPOINTS.ADMIN.GET_SCAN_HISTORY).catch(() => ({ data: { data: { data: [] } } })),
                    API.get(API_ENDPOINTS.ADMIN.GET_ECO_POINTS).catch(() => ({ data: { data: { totalPoints: 0 } } })),
                ]);

                // throw new Error("Hanya Melihat UI!");

                setStats({
                    totalFaqs: faqs.data.data?.length ?? 0,
                    totalActiveTasks: tasks.data.data?.data?.filter((t: any) => t.isActive).length ?? 0,
                    totalScans: scans.data.data?.data?.length ?? 0,
                    ecoPoints: points.data.data?.totalPoints ?? 0,
                });
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Gagal memuat statistik");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
