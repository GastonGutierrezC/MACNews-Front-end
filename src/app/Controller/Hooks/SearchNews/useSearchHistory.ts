import { SearchHistoryUser } from '@/app/Model/Entities/SearchHistory';
import { getSearchHistoryByToken } from '@/app/Model/Services/searchHistoryService';
import { useEffect, useState } from 'react';
import { useToken } from '../../Context/UserContext';


export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useToken();

  useEffect(() => {
    if (!token) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const result = await getSearchHistoryByToken(token);
        setHistory(result);
      } catch (error) {
        console.error('[useSearchHistory] Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  return { history, loading };
};
