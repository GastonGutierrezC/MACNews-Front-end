'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useCategoryLogic } from '@/app/Controller/Hooks/FilterNews/useCategoryLogic';


const CategoriesDropdown = () => {
  const { selected, handleSelect, categoriasES } = useCategoryLogic();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="bluehover">Categorías de Noticias</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selecciona una categoría</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selected}
          onValueChange={handleSelect}
        >
          {categoriasES.map((categoria) => (
            <DropdownMenuRadioItem key={categoria} value={categoria}>
              {categoria}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;

