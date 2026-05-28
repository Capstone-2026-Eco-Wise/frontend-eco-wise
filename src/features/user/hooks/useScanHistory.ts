import { useState, useEffect } from 'react';
import {
  getScanHistory,
  type ScanHistory,
} from '@/services/scanHistoryService';
import {
  userTaskCompletionsService,
  type UserTaskCompletionHistory,
} from '@/services/userTaskCompletionsService';

export const useScanHistory = () => {
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const [data, completions] = await Promise.all([
          getScanHistory(),

          userTaskCompletionsService.getUserTaskCompletions().catch(() => []),
        ]);

        const completionDates = new Set(
          completions.map((c: UserTaskCompletionHistory) =>
            new Date(c.taskDate).getTime(),
          ),
        );
        const scanBiasa = data.filter((scan: ScanHistory) => {
          return (
            !completionDates.has(new Date(scan.scannedAt).getTime()) &&
            scan.pointEarned === 0
          );
        });

        setHistory(scanBiasa);
      } catch (err) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        setError(
          error.response?.data?.message ||
            error.message ||
            'Gagal memuat riwayat scan',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [refreshTrigger]);

  return { history, loading, error, refetch };
};
