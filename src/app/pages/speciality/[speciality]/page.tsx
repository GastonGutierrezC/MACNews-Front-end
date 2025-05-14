'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CategoryNews } from '@/app/Viuw/Components/CategoryNews/CategoryNews';
import { SpecialityNews } from '@/app/Viuw/Components/SpecialityNews/SpecialityNews';


export default function Page() {
  const { speciality } = useParams<{ speciality: string }>();

  return <SpecialityNews speciality={speciality} />;
}
