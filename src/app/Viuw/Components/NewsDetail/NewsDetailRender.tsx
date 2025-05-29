'use client';

import React from 'react';
import NewsDetailCard from './NewsDetailCard';
import { useNewsDetailLogic } from '@/app/Controller/Hooks/ShowNews/useNewsDetailLogic';

interface NewsDetailRenderProps {
  title: string;
  date: string;
}

const NewsDetailRender: React.FC<NewsDetailRenderProps> = ({ title, date }) => {
  const { news, loading, error } = useNewsDetailLogic(title, date);

  if (loading) return <p className="pt-64 text-center mt-10">Cargando noticia...</p>;
  if (error) return <p className="pt-64 text-center text-red-500 mt-10">{error}</p>;

  // Validar que news y news.Channel existan antes de mostrar
  if (!news || !news.Channel) {
    return <p className="pt-64 text-center mt-10">No se encontró la noticia o canal asociado.</p>;
  }

  return <NewsDetailCard news={news} />;
};

export default NewsDetailRender;
