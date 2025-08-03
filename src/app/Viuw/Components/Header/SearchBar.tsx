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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className={`w-full max-w-[200px] sm:max-w-xs md:max-w-sm relative px-1 ${className}`}>
      <div className="flex items-center bg-white border border-black rounded-full px-2 py-[2px] w-full shadow gap-1">
        <Input
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={handleKeyDown}
          className="bg-white text-black text-xs sm:text-sm placeholder-black border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none flex-1 h-7"
        />
        <Button
          variant="ghost"
          onClick={handleSearchClick}
          className="text-black p-0 hover:bg-transparent"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      {isFocused && history.length > 0 && (
        <div className="absolute z-10 mt-1 w-full">
          <Command className="rounded-md border border-gray-300 bg-white shadow-lg max-h-40 overflow-y-auto">
            <CommandInput placeholder="Últimas búsquedas..." disabled />
            <CommandList>
              <CommandEmpty>No hay búsquedas recientes.</CommandEmpty>
              <CommandGroup heading="Recientes">
                {history.map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => handleSelectHistory(item)}
                    className="cursor-pointer text-xs"
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
