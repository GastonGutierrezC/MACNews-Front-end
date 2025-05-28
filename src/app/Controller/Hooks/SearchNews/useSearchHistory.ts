// hooks/useSearchHistory.ts

import { SearchHistoryUser } from '@/app/Model/Entities/SearchHistory';
import { getSearchHistoryByUserId } from '@/app/Model/Services/searchHistoryService';
import { useEffect, useState } from 'react';

export const useSearchHistory = (userId: string | null) => {
  const [history, setHistory] = useState<SearchHistoryUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      setLoading(true);
      const result = await getSearchHistoryByUserId(userId);
      setHistory(result);
      setLoading(false);
    };

    fetchHistory();
  }, [userId]);

  return { history, loading };
};
