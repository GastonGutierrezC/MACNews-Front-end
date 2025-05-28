import { useEffect, useState } from 'react';
import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { getAllNewsByChannel } from '@/app/Model/Services/GetAllNewsJounalistService';

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
      const sorted = data.sort((a, b) => b.VisitCount - a.VisitCount);
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
