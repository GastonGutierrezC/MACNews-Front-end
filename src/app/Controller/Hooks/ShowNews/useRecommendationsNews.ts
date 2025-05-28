import { useEffect, useState } from 'react';
import { NewsRecommendations } from '@/app/Model/Entities/NewsRecommendations';
import { getAllRecommendationsNews } from '@/app/Model/Services/GetAllRecommendationsService';

export const useRecommendationsNews = (userId?: string) => {
  const [news, setNews] = useState<NewsRecommendations[]>([]);
  const [loading, setLoading] = useState<boolean>(!!userId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError('ID de usuario no proporcionado');
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const data = await getAllRecommendationsNews(userId);
        console.log(data)
        setNews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return {
    news,
    loading,
    error,
  };
};

