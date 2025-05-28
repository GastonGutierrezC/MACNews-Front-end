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
import { useSpecialtyLogic } from '@/app/Controller/Hooks/FilterNews/useSpecialtyLogic';



const SpecialtyDropdown = () => {
  const { selected, handleSelect, specialtyES } = useSpecialtyLogic();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="bluehover">
          Especialidades
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selecciona una especialidad</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selected} onValueChange={handleSelect}>
          {specialtyES.map((categoria) => (
            <DropdownMenuRadioItem key={categoria} value={categoria}>
              {categoria}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SpecialtyDropdown;
