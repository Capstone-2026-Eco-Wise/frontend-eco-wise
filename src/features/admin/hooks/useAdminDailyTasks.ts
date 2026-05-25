import { useState, useEffect, useCallback } from "react";
import {  dailyTasksService, type DailyTask } from "@/services/dailyTasksService";
import { toast } from "sonner";
import { wasteCategoriesService } from "@/services/wasteCategoriesService";

export default function useAdminDailyTasks() {
   // data
  const [tasks, setTasks] = useState<DailyTask[]>([])
  const [categories, setCategories] = useState<{id: string, categoryName: string, categoryCode: string}[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // ui (Tambahkan yang ini)
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<DailyTask | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const tasks = await dailyTasksService.getAdminDailyTasks();
      setTasks(tasks);
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const message = error.response?.data?.message || "Failed to load tasks";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks()
    const fetchCategories = async () => {
      try {
        const categories = await wasteCategoriesService.getAll();
        setCategories(categories);
      } catch (err) {
        console.error("Gagal memuat kategori", err);
      }
    };
    fetchCategories();
  }, [fetchTasks]);
  

  const confirmDelete = async () => {
    if  (!deleteTarget) return;

    try {
      await dailyTasksService.delete(deleteTarget);
      setDeleteTarget(null);
      setSuccessMessage("Task berhasil dihapus!");
      fetchTasks();
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(error.response?.data?.message || "Gagal menghapus Task");
    }
  };

  const handleToggleActive = async (taskToToggle: DailyTask) => {
    try {
      await dailyTasksService.update(taskToToggle.id, {
        taskName: taskToToggle.taskName,
        description: taskToToggle.description,
        pointReward: taskToToggle.pointReward,
        activeDate: taskToToggle.activeDate,
        categoryId: taskToToggle.categoryId || undefined,
        isActive: !taskToToggle.isActive,
      });
      toast.success(`Task berhasil di${taskToToggle.isActive ? "nonaktifkan" : "aktifkan"}!`);
      fetchTasks();
    } catch (err) {
    const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(error.response?.data?.message || error.message || "Gagal mengubah status Task");
    }
  };
  // --- FUNGSI UI HELPERS ---
  const handleEdit = (task: DailyTask) => {
    setEditTarget(task);
    setShowModal(true);
  };
  const handleAdd = () => {
    setEditTarget(undefined);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditTarget(undefined);
  };
  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };
  const closeSuccessModal = () => {
    setSuccessMessage(null);
  };
  // Filter Data Berdasarkan Pencarian
  const filteredTasks = tasks.filter(
    (t) =>
      t.taskName.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );
  const activeTasksCount = tasks.filter((t) => t.isActive).length;
  return {
    // Data
    tasks,
    categories,
    filteredTasks,
    activeTasksCount,
    loading,
    error,
    // State UI
    search,
    setSearch,
    showModal,
    editTarget,
    deleteTarget,
    setDeleteTarget,
    successMessage,
    // Actions
    fetchTasks,
    confirmDelete,
    handleToggleActive,
    handleEdit,
    handleAdd,
    closeModal,
    closeDeleteModal,
    closeSuccessModal,
  };
};