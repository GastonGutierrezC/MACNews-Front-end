'use client';

import { useEffect, useState } from 'react';
import { useNewsDetail } from './useNewsDetail';


export const useNewsDetailLogic = () => {
  const [newsId, setNewsId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('selectedNewsId');
    console.log('ID recuperado:', storedId);
    if (storedId) {
      setNewsId(storedId);
    }
  }, []);

  const { news, loading, error } = useNewsDetail(newsId || '');
  console.log('ID recuperado 2:', newsId);

  return {
    news,
    loading,
    error,
  };
};
