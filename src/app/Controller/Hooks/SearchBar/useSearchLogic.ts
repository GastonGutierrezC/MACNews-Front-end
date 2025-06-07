'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useSaveSearchHistory } from '@/app/Controller/Hooks/SearchNews/useSaveSearchHistory';
import { useSearchHistory } from '@/app/Controller/Hooks/SearchNews/useSearchHistory';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useSearchLogic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const { user } = useUser();
  const postSearch = useSaveSearchHistory();
  const { history: userHistory } = useSearchHistory(user?.id ?? null);

  useEffect(() => {
    if (user && user.id && userHistory.length > 0) {
      const uniqueHistory = [...new Set(userHistory.map((item) => item.SearchWord))].slice(0, 10);
      setHistory(uniqueHistory);
    } else if (!user || history.length === 0) {
      setHistory(['noticias']);
    }
  }, [user, userHistory]);

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

    if (user && user.id) {
      postSearch.saveSearchHistory({ UserID: user.id, SearchWord: trimmedQuery });
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
