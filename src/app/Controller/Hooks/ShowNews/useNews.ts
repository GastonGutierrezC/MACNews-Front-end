// app/Controller/Hooks/useNews.ts
import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { getAllNews } from '@/app/Model/Services/GetAllNewsService';
import { CategoryConverter } from '@/app/Utils/GeneralConvertions/CategoryConverter';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';
import { useEffect, useState } from 'react';


export const useNews = () => {
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
      const data = await getAllNews(1);

      const formatted = data.map((n) => ({
        ...n,
        PublicationDate: DateFormatter.formatDate(n.PublicationDate),
        Categories: CategoryConverter.toSpanish(n.Categories),
      }));

      const sorted = formatted.sort((a, b) => b.VisitCount - a.VisitCount);
      setNews(sorted);
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
      const data = await getAllNews(nextPage);

      const formatted = data.map((n) => ({
        ...n,
        PublicationDate: DateFormatter.formatDate(n.PublicationDate),
      }));

      const sorted = formatted.sort((a, b) => b.VisitCount - a.VisitCount);
      setNews((prev) => [...prev, ...sorted]);
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
