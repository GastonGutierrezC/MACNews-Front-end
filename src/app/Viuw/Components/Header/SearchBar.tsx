'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useSaveSearchHistory } from '@/app/Controller/Hooks/useSaveSearchHistory';
import { useSearchHistory } from '@/app/Controller/Hooks/useSearchHistory';

const SearchBar = ({ className }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter(); 

  const { user } = useUser(); 
  const postSearch = useSaveSearchHistory();

  const { history: userHistory, loading } = useSearchHistory(user?.id ?? null);

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

  return (
    <div className={`w-full max-w-xl relative ${className}`}>
      <div className="flex items-center bg-white border border-black rounded-full px-4 py-2 w-full shadow">
        <Input
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="bg-white text-black text-2xl placeholder-black border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none flex-1"
        />
        <Button
          variant="ghost"
          onClick={handleSearchClick}
          className="text-black p-0 hover:bg-transparent"
        >
          <Search className="w-10 h-10" />
        </Button>
      </div>

      {isFocused && history.length > 0 && (
        <div className="absolute z-10 mt-2 w-full">
          <Command className="rounded-xl border border-gray-300 bg-white shadow-lg">
            <CommandInput placeholder="Últimas búsquedas..." disabled />
            <CommandList>
              <CommandEmpty>No hay búsquedas recientes.</CommandEmpty>
              <CommandGroup heading="Recientes">
                {history.map((item, idx) => (
                  <CommandItem key={idx} onSelect={() => handleSelectHistory(item)}>
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
