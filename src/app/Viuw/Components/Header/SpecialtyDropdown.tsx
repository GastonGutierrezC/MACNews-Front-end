'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

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

const specialtyES = [
  'Investigación',
   'Entrevista', 
   'Opinión', 
   'Interpretación', 
   'Datos', 
   'Social',
    'Política', 
    'Científica', 
    'Espectáculo', 
    'Negocios'
  ];

  const specialtyMap: Record<string, string> = {
    'Investigación': 'Investigative',
    'Entrevista': 'Interview',
    'Opinión': 'Opinion',
    'Interpretación': 'Interpretive',
    'Datos': 'Data',
    'Social': 'Social',
    'Política': 'Political',
    'Científica': 'Scientific',
    'Espectáculo': 'Entertainment',
    'Negocios': 'Business',
  };


const SpecialtyDropdown = () => {
  const [specialtySeleccionada, setSpecialtySeleccionada] = React.useState('Investigación');
  const router = useRouter();
  const handleChange = (value: string) => {
    console.log('Specialty seleccionada:', value);
    setSpecialtySeleccionada(value);

    const specialtyIngles = specialtyMap[value];
    if (specialtyIngles) {
      router.push(`/pages/speciality/${specialtyIngles}`);
    } else {
      console.warn(`No se encontró traducción para la categoría: ${value}`);
    }
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
