import { useState, useEffect } from "react";
import { toast } from "sonner";
import { adminUsersService } from "@/services/adminUsersService";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface PaginationMeta {
  totalData: number;
  totalPage: number;
  page: number;
  limit: number;
}

export default function useAdminUsers(search: string = "", role: string = "") {
    const [ users, setUsers ] = useState<AdminUser[]>([]);
    const [ pagination, setPagination ] = useState<PaginationMeta>({ totalData: 0, totalPage: 0, page: 1, limit: 10 });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0); // For manual refetch
 
    const refetch = () => setTrigger(prev => prev + 1);
 
    // Reset ke halaman 1 jika filter pencarian atau peran berubah
    useEffect(() => {
      setPage(1);
    }, [search, role]);
 
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminUsersService.getUsers({
                search: search || undefined,
                role: role || undefined,
                page: page,
                limit: 10
            });
            setUsers(data.data || []);
            if (data.pagination) {
                setPagination(data.pagination);
            }
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } }; message?: string };
            setError(error.response?.data?.message || error.message || "Gagal memuat pengguna");
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Memberikan Delay 500ms Saat User Mengetik
    const delayDebounce = setTimeout(() => {
        fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, role, page, trigger]);

  const handleNextPage = () => {
    if (page < pagination.totalPage) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return {
    users,
    pagination,
    loading,
    error,
    refetch,
    page,
    setPage,
    handleNextPage,
    handlePrevPage
  };
}