import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { toast } from "sonner";

export default function useAdminUsers(search: string = "", role: string = "") {
    const [ users, setUsers ] = useState<any[]>([]);
    const [ pagination, setPagination ] = useState<any>({ totalData: 0, totalPage: 0, page: 1, limit: 10 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0); // For manual refetch

    const refetch = () => setTrigger(prev => prev + 1);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await API.get(API_ENDPOINTS.ADMIN.GET_USERS, {
                params: {
                    search: search || undefined,
                    role: role || undefined
                }
            });
            setUsers(res.data.data?.data || []);
            if (res.data.data?.pagination) {
                setPagination(res.data.data.pagination);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Gagal memuat pengguna");
            toast.error(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Memberikan Delay 500ms Saat User Mengetik
    const delayDebounce = setTimeout(() => {
        fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, role, trigger]);

  return {
    users,
    pagination,
    loading,
    error,
    refetch
  };
}