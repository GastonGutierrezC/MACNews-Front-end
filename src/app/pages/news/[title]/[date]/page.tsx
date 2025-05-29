// NO debe tener 'use client' porque es un Server Component

import React from 'react';
import NewsDetailRender from '@/app/Viuw/Components/NewsDetail/NewsDetailRender';

interface PageProps {
  params: Promise<{
    title: string;
    date: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  // Esperar a que params se resuelva porque es una Promise
  const { title, date } = await params;

  const decodedTitle = decodeURIComponent(title);
  const decodedDate = decodeURIComponent(date);

  return (
    <div>
      <NewsDetailRender title={decodedTitle} date={decodedDate} />
    </div>
  );
};

export default Page;
