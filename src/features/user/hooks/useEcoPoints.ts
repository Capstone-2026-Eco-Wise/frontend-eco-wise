import { useState, useEffect } from "react";
import { getEcoPoints,type EcoPoints } from "@/services/ecoPointsService";

export const useEcoPoints = () => {
  const [pointsData, setPointsData] = useState<EcoPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        setLoading(true);
        const data = await getEcoPoints();
        setPointsData(data);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data poin");
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return { pointsData, loading, error };
};
