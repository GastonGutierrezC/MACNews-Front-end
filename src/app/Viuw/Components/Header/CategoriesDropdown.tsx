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

// Español que ve el usuario
const categoriasES = [
  'Política',
  'Deportes',
  'Economía',
  'Entretenimiento',
  'Tecnología',
  'Salud',
  'Ciencia',
  'Internacional',
  'Sociedad',
  'Seguridad',
];

// Mapeo: Español → Inglés (usado en la ruta del backend)
const categoriaMap: Record<string, string> = {
  'Política': 'Politics',
  'Deportes': 'Sports',
  'Economía': 'Economy',
  'Entretenimiento': 'Entertainment',
  'Tecnología': 'Technology',
  'Salud': 'Health',
  'Ciencia': 'Science',
  'Internacional': 'International',
  'Sociedad': 'Society',
  'Seguridad': 'Security',
};

const CategoriesDropdown = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = React.useState('Política');
  const router = useRouter();

  const handleChange = (value: string) => {
    setCategoriaSeleccionada(value);

    const categoriaIngles = categoriaMap[value];
    if (categoriaIngles) {
      router.push(`/pages/category/${categoriaIngles}`);
    } else {
      console.warn(`No se encontró traducción para la categoría: ${value}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="bluehover">Categorías</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selecciona una categoría</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={categoriaSeleccionada}
          onValueChange={handleChange}
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



//http://localhost:3001/pages/category/Politics