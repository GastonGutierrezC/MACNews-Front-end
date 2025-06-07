'use client';

import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const specialtyES = [
  'Investigación',
  'Entrevista',
  'Opinión',
  'Interpretación',
  'Datos',
  'Social',
  'Política',
  'Científica',
  'Espectáculo',
  'Negocios',
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

export const useSpecialtyLogic = () => {
  const [selected, setSelected] = useState('Investigación');
  const router = useRouter();

  // Prefetch al cambiar la especialidad seleccionada
  useEffect(() => {
    const translated = specialtyMap[selected];
    if (translated) {
      router.prefetch(ROUTES.SPECIALITY(translated));
    }
  }, [selected, router]);

  const handleSelect = (value: string) => {
    console.log('Specialty seleccionada:', value);
    setSelected(value);

    const translated = specialtyMap[value];
    if (translated) {
      router.push(ROUTES.SPECIALITY(translated));
    } else {
      console.warn(`No se encontró traducción para la categoría: ${value}`);
    }
  };

  return {
    selected,
    handleSelect,
    specialtyES,
  };
};
