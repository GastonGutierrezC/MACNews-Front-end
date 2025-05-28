'use client';

import React from 'react';
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
import { useSearchLogic } from '@/app/Controller/Hooks/SearchBar/useSearchLogic';

const SearchBar = ({ className }: { className?: string }) => {
  const {
    searchQuery,
    setSearchQuery,
    history,
    isFocused,
    setIsFocused,
    handleSearchClick,
    handleSelectHistory,
  } = useSearchLogic();

  return (
    <div className={`w-full max-w-xs sm:max-w-md md:max-w-xl relative px-2 ${className}`}>
      <div className="flex items-center bg-white border border-black rounded-full px-3 py-2 sm:px-4 sm:py-2 w-full shadow gap-2">
        <Input
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="bg-white text-black text-base sm:text-xl placeholder-black border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none flex-1"
        />
        <Button
          variant="ghost"
          onClick={handleSearchClick}
          className="text-black p-0 hover:bg-transparent"
        >
          <Search className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </Button>
      </div>

      {isFocused && history.length > 0 && (
        <div className="absolute z-10 mt-2 w-full">
          <Command className="rounded-xl border border-gray-300 bg-white shadow-lg max-h-64 overflow-y-auto">
            <CommandInput placeholder="Últimas búsquedas..." disabled />
            <CommandList>
              <CommandEmpty>No hay búsquedas recientes.</CommandEmpty>
              <CommandGroup heading="Recientes">
                {history.map((item, idx) => (
                  <CommandItem
                    key={idx}
                    onSelect={() => handleSelectHistory(item)}
                    className="cursor-pointer"
                  >
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
