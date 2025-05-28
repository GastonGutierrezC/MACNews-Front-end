// app/Controller/Hooks/useSearchLogic.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useSaveSearchHistory } from '@/app/Controller/Hooks/SearchNews/useSaveSearchHistory';
import { useSearchHistory } from '@/app/Controller/Hooks/SearchNews/useSearchHistory';

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

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    if (!history.includes(trimmedQuery)) {
      setHistory([trimmedQuery, ...history].slice(0, 10));
    }

    const encodedQuery = encodeURIComponent(trimmedQuery);
    router.push(`/pages/search/${encodedQuery}`);
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
