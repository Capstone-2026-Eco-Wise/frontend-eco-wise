import { useState, useEffect } from "react";
import { adminStatsService, type AdminStats } from "@/services/adminStatsService";

export default function useAdminStats() {
    const [stats, setStats] = useState<AdminStats>({
        totalUsers: 0,
        totalAdmins: 0,
        totalScans: 0,
        totalPoints: 0,
        totalFaqs: 0,
        totalDailyTasks: 0,
        totalWasteCategories: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await adminStatsService.getStats();
                setStats(data);
            } catch (err) {
                const error = err as {
                    response?: { data?: { message?: string } };
                    message?: string;
                };
                setError(error.response?.data?.message || "Gagal memuat statistik");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
