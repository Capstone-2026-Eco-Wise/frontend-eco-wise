import { useState, useEffect, useCallback } from "react";
import { wasteCategoriesService } from "@/services/wasteCategoriesService";
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
      const data = await wasteCategoriesService.getAll();
      setCategories(data);
    } catch (err) {
      const error = err as { response?: { status: number; data?: { message?: string } }; message?: string };
      // Jika error karena database kosong, kita biarkan saja list kosong
      if (error.response?.status === 404) {
        setCategories([]);
      } else {
        const message = error.response?.data?.message || error.message || "Gagal memuat kategori";
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
      await wasteCategoriesService.delete(deleteTarget);
      setDeleteTarget(null);
      toast.success("Kategori berhasil dihapus!");
      fetchCategories();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      toast.error(error.response?.data?.message || "Gagal menghapus kategori");
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
