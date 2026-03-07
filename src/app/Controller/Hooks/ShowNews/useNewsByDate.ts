import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { getAllNewsByDate } from '@/app/Model/Services/GetAllNewsServiceByDate';
import { CategoryConverter } from '@/app/Utils/GeneralConvertions/CategoryConverter';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';
import { useEffect, useState } from 'react';

export const useNewsByDate = () => {
  const [news, setNews] = useState<NewsEntity[]>([]);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchInitialNews();
  }, []);

  const fetchInitialNews = async () => {
    try {
      const data = await getAllNewsByDate(1);

      const formatted = data.map((n) => ({
        ...n,
        PublicationDate: DateFormatter.formatDate(n.PublicationDate),
        Categories: CategoryConverter.toSpanish(n.Categories),
      }));

      // Se eliminó el ordenamiento por VisitCount
      setNews(formatted);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingInitial(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await getAllNewsByDate(nextPage);

      const formatted = data.map((n) => ({
        ...n,
        PublicationDate: DateFormatter.formatDate(n.PublicationDate),
        Categories: CategoryConverter.toSpanish(n.Categories), // mantener coherencia
      }));

      // Se eliminó el ordenamiento por VisitCount
      setNews((prev) => [...prev, ...formatted]);
      setPage(nextPage);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    news,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
  };
};
