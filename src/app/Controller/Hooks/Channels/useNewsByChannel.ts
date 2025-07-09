import { useEffect, useState } from 'react';
import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { getAllNewsByChannel } from '@/app/Model/Services/GetAllNewsJounalistService';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';
import { CategoryConverter } from '@/app/Utils/GeneralConvertions/CategoryConverter';

export const useNewsByChannel = (channelId: string) => {
  const [news, setNews] = useState<NewsEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) return;
    fetchNewsByChannel();
  }, [channelId]);

  const fetchNewsByChannel = async () => {
    try {
      const data = await getAllNewsByChannel(channelId);

      // Formatear fechas
      const formatted = data.map(item => ({
        ...item,
        PublicationDate: DateFormatter.formatDate(item.PublicationDate),
        Categories: CategoryConverter.toSpanish(item.Categories)
      }));

      const sorted = formatted.sort((a, b) => b.VisitCount - a.VisitCount);
      setNews(sorted);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
  };
};
