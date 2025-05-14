import { useEffect, useState } from 'react';
import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { getNewsBySpeciality } from '@/app/Model/Services/GetNewsBySpecialityService';

export const useNewsBySpeciality = (specialty: string) => {
  const [news, setNews] = useState<NewsEntity[]>([]);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
// Speciality
  useEffect(() => {
    // Reiniciamos cuando cambia la categoría
    setNews([]);
    setPage(1);
    fetchInitialNews(specialty);
  }, [specialty]);

  const fetchInitialNews = async (cat: string) => {
    try {
      const data = await getNewsBySpeciality(cat, 1);
      const sorted = data.sort((a, b) => b.VisitCount - a.VisitCount);
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
      const data = await getNewsBySpeciality(specialty, nextPage);
      const sorted = data.sort((a, b) => b.VisitCount - a.VisitCount);
      setNews(prev => [...prev, ...sorted]);
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
