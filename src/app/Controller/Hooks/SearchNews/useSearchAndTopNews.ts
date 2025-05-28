// src/app/Controller/Hooks/SearchBar/useSearchAndTopNews.ts
'use client';

import { useEffect } from 'react';

import { useTopNews } from '@/app/Controller/Hooks/ShowNews/useTopNews';
import { useSearchNews } from '../SearchBar/useSearchNews';

export const useSearchAndTopNews = (term: string) => {
  const {
    searchResults,
    loadingSearch,
    searchError,
    searchNews,
  } = useSearchNews();

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop,
  } = useTopNews();

  useEffect(() => {
    if (term) {
      searchNews(decodeURIComponent(term));
    }
  }, [term]);

  return {
    searchResults,
    loadingSearch,
    searchError,
    topNews,
    loadingTop,
    errorTop,
  };
};
