// src/app/pages/search/[term]/page.tsx

// src/app/pages/search/[term]/page.tsx

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { SearchNews } from '@/app/Viuw/Components/SearchNews/SearchNews';

export default function Page() {
  const { term } = useParams<{ term: string }>();

  return <SearchNews term={term} />;
}
