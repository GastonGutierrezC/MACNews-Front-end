'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSaveSearchHistory } from '@/app/Controller/Hooks/SearchNews/useSaveSearchHistory';
import { useSearchHistory } from '@/app/Controller/Hooks/SearchNews/useSearchHistory';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useToken } from '../../Context/UserContext';

export const useSearchLogic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const { token } = useToken();
  const postSearch = useSaveSearchHistory();
  const { history: userHistory } = useSearchHistory();

  useEffect(() => {
    if (token && userHistory.length > 0) {
      const uniqueHistory = [...new Set(userHistory.map((item) => item.SearchWord))].slice(0, 10);
      setHistory(uniqueHistory);
    } else {
      setHistory(['noticias']);
    }
  }, [token, userHistory]);

  // Prefetch de la ruta de búsqueda (puedes hacerlo para la búsqueda actual o un patrón general)
  useEffect(() => {
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.prefetch(ROUTES.SEARCH(encodedQuery));
    }
  }, [searchQuery, router]);

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    if (!history.includes(trimmedQuery)) {
      setHistory([trimmedQuery, ...history].slice(0, 10));
    }

    const encodedQuery = encodeURIComponent(trimmedQuery);
    router.push(ROUTES.SEARCH(encodedQuery));
    setIsFocused(false);

    if (token) {
      postSearch.saveSearchHistory({ SearchWord: trimmedQuery });
    } else {
      console.log('[SearchBar] Usuario no logueado, no se guarda búsqueda.');
    }
  };

  const handleSelectHistory = (value: string) => {
    setSearchQuery(value);
    console.log('Texto buscado desde historial:', value);
    setIsFocused(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    history,
    isFocused,
    setIsFocused,
    handleSearchClick,
    handleSelectHistory,
  };
};

