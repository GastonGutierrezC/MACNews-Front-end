'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

  const handleSelect = (value: string) => {
    console.log('Specialty seleccionada:', value);
    setSelected(value);

    const translated = specialtyMap[value];
    if (translated) {
      router.push(`/pages/speciality/${translated}`);
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
