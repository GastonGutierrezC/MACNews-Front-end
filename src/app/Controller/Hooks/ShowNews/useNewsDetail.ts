import { useEffect, useRef, useState } from 'react';
import { NewsDetail } from '@/app/Model/Entities/NewsDetail';
import { getNewsDetail } from '@/app/Model/Services/GetNewsDetailService';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';
import { createVisit } from '@/app/Model/Services/VisitService';

export const useNewsDetail = (title: string | null, date: string | null) => {
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!title || !date || hasFetched.current) return;

    hasFetched.current = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const isoDate = DateFormatter.toISODate(date);
        const data = await getNewsDetail(title, isoDate);
        setNews(data);


        const token = localStorage.getItem('token');
        if (token && data?.NewsId) {
          await createVisit({ NewsID: data.NewsId });
        }
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
