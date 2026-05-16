import { useState, useEffect } from "react";
import { getDailyTasks, type DailyTask } from "@/services/dailyTasksService";

export const useDailyTasks = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getDailyTasks();
        setTasks(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Gagal memuat daftar tugas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};
