'use client';

import React from 'react';
import NewsDetailCard from './NewsDetailCard';
import { useNewsDetailLogic } from '@/app/Controller/Hooks/ShowNews/useNewsDetailLogic';

const NewsDetailRender = () => {
  const { news, loading, error } = useNewsDetailLogic();

  if (loading) return <p className="pt-64 text-center mt-10">Cargando noticia...</p>;
  if (error) return <p className="pt-64 text-center text-red-500 mt-10">{error}</p>;
  if (!news) return <p className="pt-64 text-center mt-10">No se encontró la noticia.</p>;

  return <NewsDetailCard news={news} />;
};

export default NewsDetailRender;
