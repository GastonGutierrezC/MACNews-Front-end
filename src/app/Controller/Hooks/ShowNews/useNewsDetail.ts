import { useEffect, useState } from 'react';
import { NewsDetail } from '@/app/Model/Entities/NewsDetail';
import { getNewsDetail } from '@/app/Model/Services/GetNewsDetailService';

export const useNewsDetail = (newsId: string | null) => {
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!newsId) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNewsDetail(newsId);
        setNews(data);
      } catch (err: any) {
        setError(err.message || 'Error al obtener la noticia');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  return {
    news,
    loading,
    error,
  };
};
