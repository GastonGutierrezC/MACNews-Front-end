import { useEffect, useState } from 'react';
import { NewsRecommendations } from '@/app/Model/Entities/NewsRecommendations';
import { getAllRecommendationsNews } from '@/app/Model/Services/GetAllRecommendationsService';
import { useToken } from '../../Context/UserContext';


export const useRecommendationsNews = () => {
  const [news, setNews] = useState<NewsRecommendations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError('Token no disponible, no autenticado');
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const data = await getAllRecommendationsNews(token);
        console.log('[useRecommendationsNews] Datos recibidos:', data);
        setNews(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  return {
    news,
    loading,
    error,
  };
};
