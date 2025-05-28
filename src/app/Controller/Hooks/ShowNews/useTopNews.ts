// app/Hooks/useNews.ts

import { NewsTopEntity } from '@/app/Model/Entities/FintTopNews';
import { useEffect, useState } from 'react';
import { getTopNews } from '@/app/Model/Services/GetTopNewsService';

export const useTopNews = () => {
  const [news, setNews] = useState<NewsTopEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const data = await getTopNews();
        const topTen = data.slice(0, 10); 
        setNews(topTen);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopNews();
  }, []);

  return { news, loading, error };
};
