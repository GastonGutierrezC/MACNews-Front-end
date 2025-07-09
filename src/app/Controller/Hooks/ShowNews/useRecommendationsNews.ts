import { useEffect, useState } from 'react';
import { NewsRecommendations } from '@/app/Model/Entities/NewsRecommendations';
import { getAllRecommendationsNews } from '@/app/Model/Services/GetAllRecommendationsService';
import { useToken } from '../../Context/UserContext';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';
import { CategoryConverter } from '@/app/Utils/GeneralConvertions/CategoryConverter';


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

        const formattedData = data.map((news) => ({
          ...news,
          PublicationDate: DateFormatter.formatDate(news.PublicationDate),
          Categories: CategoryConverter.toSpanish(news.Categories)
        }));

        setNews(formattedData);
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
