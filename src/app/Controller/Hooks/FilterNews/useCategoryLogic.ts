'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const categoriasES = [
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

export const useCategoryLogic = () => {
  const [selected, setSelected] = useState('Política');
  const router = useRouter();

  const handleSelect = (value: string) => {
    setSelected(value);

    const translated = categoriaMap[value];
    if (translated) {
      router.push(`/pages/category/${translated}`);
    } else {
      console.warn(`No se encontró traducción para la categoría: ${value}`);
    }
  };

  return {
    selected,
    handleSelect,
    categoriasES,
  };
};
