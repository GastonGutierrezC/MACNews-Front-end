'use client';

import React, { useEffect, useState } from 'react';
import NewsDetailCard from './NewsDetailCard';
import { useNewsDetail } from '@/app/Controller/Hooks/useNewsDetail';

const NewsDetailRender = () => {
  const [newsId, setNewsId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('selectedNewsId');
    console.log('ID recuperado:', storedId); 
    if (storedId) {
      setNewsId(storedId);
    }
  }, []);
  

  const { news, loading, error } = useNewsDetail(newsId || '');
  console.log('ID recuperado 2:', newsId); 

  if (loading) return <p className="pt-64 text-center mt-10">Cargando noticia...</p>;
  if (error) return <p className="pt-64 text-center text-red-500 mt-10">{error}</p>;
  if (!news) return <p className="pt-64 text-center mt-10">No se encontró la noticia.</p>;

  return <NewsDetailCard news={news} />;
};

export default NewsDetailRender;
