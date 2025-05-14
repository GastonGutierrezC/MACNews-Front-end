'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CategoryNews } from '@/app/Viuw/Components/CategoryNews/CategoryNews';


export default function Page() {
  const { category } = useParams<{ category: string }>();

  return <CategoryNews category={category} />;
}
