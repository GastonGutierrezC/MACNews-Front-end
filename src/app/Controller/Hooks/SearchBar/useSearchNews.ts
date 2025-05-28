// app/Controller/Hooks/useSearchNews.ts

import { useState } from 'react';
import { NewsEntity } from '@/app/Model/Entities/NewsEntity';
import { searchIntelligentNews } from '@/app/Model/Services/SearchIntelligentNewsService';

export const useSearchNews = () => {
  const [searchResults, setSearchResults] = useState<NewsEntity[]>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchNews = async (query: string) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      setLoadingSearch(true);
      const results = await searchIntelligentNews(query);
      setSearchResults(results);
    } catch (err: any) {
      setSearchError(err.message);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  return {
    searchResults,
    loadingSearch,
    searchError,
    searchNews,
  };
};
