import { useState, useEffect, useCallback } from "react";
import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { DailyTask } from "@/services/dailyTasksService";
import { toast } from "sonner";

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
      
      const res = await API.get(API_ENDPOINTS.ADMIN.GET_DAILY_TASKS);
      const data = res.data.data?.data || res.data.data || [];
      setTasks(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to load tasks";
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
        const res = await API.get(API_ENDPOINTS.WASTE_CATEGORIES.GET_ALL);
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat kategori", err);
      }
    };
    fetchCategories();
  }, [fetchTasks]);
  

  const confirmDelete = async () => {
    if  (!deleteTarget) return;

    try {
      const url = API_ENDPOINTS.DAILY_TASKS.DELETE.replace(":id", deleteTarget);
      await API.delete(url);
      setDeleteTarget(null);
      setSuccessMessage("Task berhasil dihapus!");
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Gagal menghapus Task");
    }
  };

  const handleToggleActive = async (taskToToggle: DailyTask) => {
    try {
      const url = API_ENDPOINTS.DAILY_TASKS.UPDATE.replace(":id", taskToToggle.id);
      await API.put(url, {
        taskName: taskToToggle.taskName,
        description: taskToToggle.description,
        pointReward: taskToToggle.pointReward,
        activeDate: taskToToggle.activeDate,
        categoryId: taskToToggle.categoryId || undefined,
        isActive: !taskToToggle.isActive,
      });
      toast.success(`Task berhasil di${taskToToggle.isActive ? "nonaktifkan" : "aktifkan"}!`);
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Gagal mengubah status Task");
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
    }