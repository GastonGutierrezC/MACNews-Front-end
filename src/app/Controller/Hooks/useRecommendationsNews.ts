// app/Hooks/useNews.ts


import { useEffect, useState } from 'react';
import { NewsRecommendations } from '@/app/Model/Entities/NewsRecommendations';
import { getAllRecommendationsNews } from '@/app/Model/Services/GetAllRecommendationsService';

export const useRecommendationsNews = (userId: string) => {
  const [news, setNews] = useState<NewsRecommendations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getAllRecommendationsNews(userId);
        setNews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendations();
    } else {
      setLoading(false);
      setError('ID de usuario no proporcionado');
    }
  }, [userId]);

  return {
    news,
    loading,
    error,
  };
};
