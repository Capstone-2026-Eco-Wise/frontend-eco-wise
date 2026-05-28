import { useState, useEffect, useCallback } from 'react';
import { userTaskCompletionsService, type UserTaskCompletionHistory } from '@/services/userTaskCompletionsService';
import { useSession } from '@/features/auth/hooks/useSession';

export const useUserTaskCompletions = () => {
  const [history, setHistory] = useState<UserTaskCompletionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useSession();

  const fetchHistory = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await userTaskCompletionsService.getUserTaskCompletions();
      setHistory(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch task completions');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};
