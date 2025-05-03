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

const specialty = ['Investigación', 'Entrevistas', 'Opinión'];

const SpecialtyDropdown = () => {
  const [specialtySeleccionada, setSpecialtySeleccionada] = React.useState('Investigación');

  const handleChange = (value: string) => {
    console.log('Specialty seleccionada:', value);
    setSpecialtySeleccionada(value);
  };

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
        <DropdownMenuRadioGroup value={specialtySeleccionada} onValueChange={handleChange}>
          {specialty.map((categoria) => (
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
