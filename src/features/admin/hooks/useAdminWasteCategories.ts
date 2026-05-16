import { useState, useEffect, useCallback } from "react";
import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { WasteCategory } from "@/services/wasteCategoriesService";
import { toast } from "sonner";

export default function useAdminWasteCategories() {
  const [categories, setCategories] = useState<WasteCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<WasteCategory | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get(API_ENDPOINTS.WASTE_CATEGORIES.GET_ALL);
      setCategories(res.data.data || []);
    } catch (err: any) {
      // Jika error karena database kosong, kita biarkan saja list kosong
      if (err.response?.status === 404) {
        setCategories([]);
      } else {
        const message = err.response?.data?.message || err.message || "Gagal memuat kategori";
        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const url = API_ENDPOINTS.WASTE_CATEGORIES.DELETE.replace(":id", deleteTarget);
      await API.delete(url);
      setDeleteTarget(null);
      toast.success("Kategori berhasil dihapus!");
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Gagal menghapus kategori");
    }
  };

  // UI Helpers
  const handleEdit = (category: WasteCategory) => {
    setEditTarget(category);
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

  const filteredCategories = categories.filter(
    (c) =>
      c.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      c.categoryCode.toLowerCase().includes(search.toLowerCase())
  );

  return {
    categories,
    filteredCategories,
    loading,
    error,
    search,
    setSearch,
    showModal,
    editTarget,
    deleteTarget,
    setDeleteTarget,
    fetchCategories,
    confirmDelete,
    handleEdit,
    handleAdd,
    closeModal,
    closeDeleteModal,
  };
}
