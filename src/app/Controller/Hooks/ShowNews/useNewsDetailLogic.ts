'use client';

import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';
import { useNewsDetail } from './useNewsDetail';
import { CategoryConverter } from '@/app/Utils/GeneralConvertions/CategoryConverter';


export const useNewsDetailLogic = (title: string, date: string) => {
  const { news, loading, error } = useNewsDetail(title, date);

  // Modificamos solo la fecha para devolver un nuevo objeto news con la fecha formateada
  const newsWithFormattedDate = news
    ? { ...news, PublicationDate: DateFormatter.formatDate(news.PublicationDate), Categories: CategoryConverter.toSpanish(news.Categories), }
    : null;

  return {
    news: newsWithFormattedDate,
    loading,
    error,
  };
};
