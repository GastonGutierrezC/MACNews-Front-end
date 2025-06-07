'use client';

import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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

  // Prefetch cuando cambia la categoría seleccionada
  useEffect(() => {
    const translated = categoriaMap[selected];
    if (translated) {
      router.prefetch(ROUTES.CATEGORY(translated));
    }
  }, [selected, router]);

  const handleSelect = (value: string) => {
    setSelected(value);

    const translated = categoriaMap[value];
    if (translated) {
      router.push(ROUTES.CATEGORY(translated));
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
