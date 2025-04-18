// app/Hooks/useNews.ts

import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { getAllNews } from '@/app/Model/Services/GetAllNewsService';
import { useEffect, useState } from 'react';

export const useNews = () => {
  const [news, setNews] = useState<NewsEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNews();

        // Ordenamos por VisitCount de mayor a menor
        const sortedNews = data.sort((a, b) => b.VisitCount - a.VisitCount);

        setNews(sortedNews);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
  };
};
