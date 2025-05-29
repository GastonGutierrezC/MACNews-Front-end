import { useEffect, useState } from 'react';
import { NewsDetail } from '@/app/Model/Entities/NewsDetail';
import { getNewsDetail } from '@/app/Model/Services/GetNewsDetailService';

export const useNewsDetail = (title: string | null, date: string | null) => {
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title || !date) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNewsDetail(title, date);
        setNews(data);
      } catch (err: any) {
        setError(err.message || 'Error al obtener la noticia');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [title, date]);

  return {
    news,
    loading,
    error,
  };
};
