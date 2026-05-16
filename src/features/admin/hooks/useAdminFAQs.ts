import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { type FAQ } from "@/services/faqsService";

export default function useAdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchFaqs = async () => {
    try {
        setLoading(true);
        const res = await API.get(API_ENDPOINTS.ADMIN.GET_FAQS);
        setFaqs(res.data.data || []);
        setError(null);
    } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Gagal mengambil data FAQ")
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return { faqs, loading, error, refetch: fetchFaqs };
}
