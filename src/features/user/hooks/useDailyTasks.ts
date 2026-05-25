import { useState, useEffect } from "react";
import { getDailyTasks, type DailyTask } from "@/services/dailyTasksService";

export const useDailyTasks = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getDailyTasks();
        // Filter agar User hanya melihat task hari ini
        const tzOffset = new Date().getTimezoneOffset() * 60000;
        const today = new Date(Date.now() - tzOffset).toISOString().split("T")[0];
        const activeTasksForToday = data.filter((task: DailyTask) => {
          if (!task.isActive) return false;
          const taskDate = new Date(task.activeDate).toISOString().split("T")[0];
          return taskDate === today;
        });
        setTasks(activeTasksForToday);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        setError(error.response?.data?.message || error.message || "Gagal memuat daftar tugas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refreshTrigger]);

  return { tasks, loading, error, refetch };
};
