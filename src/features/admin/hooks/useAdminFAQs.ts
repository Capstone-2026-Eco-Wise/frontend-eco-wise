import { useState, useEffect } from "react";
import { type FAQ, faqsService } from "@/services/faqsService";

export default function useAdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchFaqs = async () => {
    try {
        setLoading(true);
        const data = await faqsService.getAdminFAQs();
        setFaqs(data);
        setError(null);
    } catch (err) {
      const error = err as {
        response?: { status?: number; data?: { message?: string } };
        message?: string;
      };
      if (error.response?.status === 404) {
        setFaqs([]);
        setError(null);
      } else {
        setError(error.response?.data?.message || "Gagal mengambil data FAQ");
      }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return { faqs, loading, error, refetch: fetchFaqs };
}
