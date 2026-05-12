import { useState, useEffect } from "react";
import { getScanHistory, type ScanHistory } from "@/services/scanHistoryService";

export const useScanHistory = () => {
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getScanHistory();
        setHistory(data);
      } catch (err: any) {
        setError(err.message || "Gagal memuat riwayat scan");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, loading, error };
};
