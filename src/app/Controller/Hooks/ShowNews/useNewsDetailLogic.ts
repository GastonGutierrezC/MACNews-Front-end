'use client';

import { useNewsDetail } from './useNewsDetail';

export const useNewsDetailLogic = (title: string, date: string) => {
  const { news, loading, error } = useNewsDetail(title, date);

  return {
    news,
    loading,
    error,
  };
};
