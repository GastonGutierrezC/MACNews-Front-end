import { useEffect, useState } from 'react';
import { getNewsByChannelAndCategory } from '@/app/Model/Services/getNewsByChannelAndCategory';
import { NewsByChannelCategoryEntity } from '@/app/Model/Entities/News-by-channel-category.entity';

export const useNewsByChannelAndCategory = (
  channelId: string,
  category: string
) => {
  const [news, setNews] = useState<NewsByChannelCategoryEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (channelId && category) {
      fetchNews();
    }
  }, [channelId, category]);

  const fetchNews = async () => {
    try {
      const data = await getNewsByChannelAndCategory(channelId, category);
      setNews(data);
    } catch (err: any) {
      setError(err.message || "Error fetching news by channel and category.");
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
